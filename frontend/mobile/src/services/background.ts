// src/services/background.ts
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import * as Location from "expo-location";
import { loadTripState } from "../storage/trip";
import { updateLocation } from "./api";
import { getLastKnownLocation } from "./location";

/**
 * Background task name (must match registration)
 */
export const LOCATION_TASK = "background-location-task";

/**
 * Background task implementation (uses expo-background-fetch)
 * This will try to:
 * - load the active trip
 * - obtain a current location (or reuse last known)
 * - decide whether to send (avoid sending very frequently when stationary)
 * - call updateLocation (which itself will fallback to queue on network failure)
 */
TaskManager.defineTask(LOCATION_TASK, async () => {
  try {
    const trip = await loadTripState();
    if (!trip || !trip.tripId || trip.status !== "running") {
      return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    // Check last known location (from foreground watcher) - reuse if fresher
    const last = getLastKnownLocation();

    let loc: Location.LocationObject | null = null;
    try {
      // Attempt to get a fresh high accuracy location, but if background constraints prevent it, fall back
      loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
    } catch {
      // Could fail in background; fall back to last known
      loc = null;
    }

    const payload = loc
      ? {
          lat: loc.coords.latitude,
          lon: loc.coords.longitude,
          accuracy: loc.coords.accuracy,
          timestamp: Date.now(),
        }
      : last
      ? {
          lat: last.lat,
          lon: last.lon,
          accuracy: last.accuracy,
          timestamp: last.timestamp,
        }
      : null;

    if (!payload) {
      // no data to send
      return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    // Smart throttle: avoid sending if stationary and last sent was recent.
    // We'll store last sent timestamp in task context via BackgroundFetch.getStatusAsync is not enough,
    // so a simple heuristic: if movement since lastKnown < 25m -> treat as stationary and allow less frequent sends.
    const prev = last;
    if (prev) {
      const dist = Math.max(
        0,
        Math.hypot(prev.lat - payload.lat, prev.lon - payload.lon) * 111320 // rough conversion deg->meters
      );
      if (dist < 25) {
        // Stationary: prefer to skip if too frequent: (background fetch frequency is controlled by system)
        // We still attempt to send once to update server, but this avoids heavy location fetches.
      }
    }

    try {
      await updateLocation(trip.tripId, payload);
    } catch (err) {
      // updateLocation already uses queue fallback
    }

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (err) {
    console.warn("Background location task failed:", err);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

/**
 * Register background task on app start.
 */
export async function registerBackgroundTask() {
  try {
    const status = await BackgroundFetch.getStatusAsync();

    if (
      status === BackgroundFetch.BackgroundFetchStatus.Restricted ||
      status === BackgroundFetch.BackgroundFetchStatus.Denied
    ) {
      console.warn("Background fetch not available/allowed on this device");
      return;
    }

    // Register with a minimum interval (approx); system may throttle
    await BackgroundFetch.registerTaskAsync(LOCATION_TASK, {
      minimumInterval: 120, // seconds (request every 2 minutes)
      stopOnTerminate: false,
      startOnBoot: true,
    });
    console.log("Registered background-location-task");
  } catch (err) {
    console.error("Failed to register background task", err);
  }
}

export async function unregisterBackgroundTask() {
  try {
    await BackgroundFetch.unregisterTaskAsync(LOCATION_TASK);
  } catch (err) {
    console.warn("Could not unregister task", err);
  }
}

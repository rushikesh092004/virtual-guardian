// src/services/location.ts
import * as Location from "expo-location";
import { updateLocation } from "./api";
import {
  startMotionDetection,
  stopMotionDetection,
  onMotionChange,
  getMotionState,
} from "./motion";
import { loadTripState } from "../storage/trip";

type Loc = {
  lat: number;
  lon: number;
  accuracy?: number;
  timestamp: number;
};

let foregroundSubscription: Location.LocationSubscription | null = null;
let lastKnown: Loc | null = null;

/**
 * Request permissions
 */
export async function requestLocationPermission(): Promise<boolean> {
  const fg = await Location.requestForegroundPermissionsAsync();
  if (fg.status !== "granted") return false;

  const bg = await Location.getBackgroundPermissionsAsync();
  if (bg.status !== "granted") {
    const req = await Location.requestBackgroundPermissionsAsync();
    return req.status === "granted";
  }
  return true;
}

/**
 * One-shot current location
 */
export async function getCurrentLocation(): Promise<Loc> {
  const loc = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  const out: Loc = {
    lat: loc.coords.latitude,
    lon: loc.coords.longitude,
    accuracy: loc.coords.accuracy ?? undefined,
    timestamp: Date.now(),
  };

  lastKnown = out;
  return out;
}

/**
 * Distance in meters (Haversine)
 */
export function distanceMeters(a: Loc, b: Loc) {
  const R = 6371000;
  const toRad = (v: number) => (v * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

/**
 * Adaptive foreground tracking + accelerometer motion detection
 */
export async function startAdaptiveLocationUpdates(opts?: {
  tripId?: string | null;
  onLocation?: (loc: Loc) => void;
}) {
  if (foregroundSubscription) return;

  const HIGH_FREQ = {
    accuracy: Location.Accuracy.Highest,
    timeInterval: 30_000,
    distanceInterval: 20,
  };

  const LOW_FREQ = {
    accuracy: Location.Accuracy.Balanced,
    timeInterval: 180_000,
    distanceInterval: 100,
  };

  const STATIONARY_DISTANCE_M = 30;
  const SPEED_THRESHOLD = 1.5;

  const pick = (prev: Loc | null, cur: Loc) => {
    if (!prev) return HIGH_FREQ;

    const dist = distanceMeters(prev, cur);
    const dt = (cur.timestamp - prev.timestamp) / 1000;
    const speed = dt > 0 ? dist / dt : 0;

    if (dist > STATIONARY_DISTANCE_M || speed > SPEED_THRESHOLD) {
      return HIGH_FREQ;
    }
    return LOW_FREQ;
  };

  let currentOptions = HIGH_FREQ;

  /**
   * START MOTION DETECTION
   */
  startMotionDetection();

  const unsubscribeMotion = onMotionChange((motionState) => {
    if (motionState === "moving") {
      currentOptions = HIGH_FREQ;
    } else {
      currentOptions = LOW_FREQ;
    }
  });

  /**
   * Watcher subscribe function
   */
  const subscribe = async (options: any) => {
    if (foregroundSubscription) {
      try {
        await foregroundSubscription.remove();
      } catch {}
      foregroundSubscription = null;
    }

    foregroundSubscription = await Location.watchPositionAsync(
      {
        accuracy: options.accuracy,
        distanceInterval: options.distanceInterval,
        timeInterval: options.timeInterval,
      },
      async (loc) => {
        const out: Loc = {
          lat: loc.coords.latitude,
          lon: loc.coords.longitude,
          accuracy: loc.coords.accuracy ?? undefined,
          timestamp: Date.now(),
        };

        const prev = lastKnown;
        lastKnown = out;

        opts?.onLocation?.(out);

        if (opts?.tripId) {
          try {
            await updateLocation(opts.tripId, out);
          } catch {}
        }

        const basePick = pick(prev, out);
        const motion = getMotionState();

        let newOpts = basePick;

        if (motion === "moving") {
          newOpts = HIGH_FREQ;
        } else if (motion === "still") {
          newOpts = LOW_FREQ;
        }

        const changed =
          newOpts.accuracy !== options.accuracy ||
          newOpts.distanceInterval !== options.distanceInterval ||
          newOpts.timeInterval !== options.timeInterval;

        if (changed) {
          setTimeout(() => subscribe(newOpts), 500);
        }
      }
    );
  };

  await subscribe(currentOptions);

  /**
   * CLEANUP FUNCTION RETURNED
   */
  return () => {
    if (foregroundSubscription) {
      try {
        foregroundSubscription.remove();
      } catch {}
      foregroundSubscription = null;
    }

    unsubscribeMotion();
    stopMotionDetection();
  };
}

/**
 * Stop adaptive updates
 */
export async function stopAdaptiveLocationUpdates() {
  if (foregroundSubscription) {
    try {
      await foregroundSubscription.remove();
    } catch {}
    foregroundSubscription = null;
  }
}

/**
 * Return last known location
 */
export function getLastKnownLocation(): Loc | null {
  return lastKnown;
}

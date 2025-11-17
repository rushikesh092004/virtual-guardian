// src/services/network.ts
import * as Network from "expo-network";
import { retryQueue } from "./api";

let interval: ReturnType<typeof setInterval> | null = null;

export function startNetworkWatcher() {
  if (interval) return;

  interval = setInterval(async () => {
    try {
      const state = await Network.getNetworkStateAsync();

      const connected = state.isConnected === true;
      const internetReachable = state.isInternetReachable === true;

      if (connected && internetReachable) {
        try {
          await retryQueue();
        } catch (err) {
          console.warn("retryQueue failed:", err);
        }
      }
    } catch (err) {
      console.warn("Network watcher error:", err);
    }
  }, 5000);
}

export function stopNetworkWatcher() {
  if (interval !== null) {
    clearInterval(interval);
    interval = null;
  }
}

// src/hooks/useOfflineStatus.ts
import { useEffect, useState } from "react";
import * as Network from "expo-network";
import { loadQueue } from "../storage/queue";
import { useTrip } from "./useTrip";

export function useOfflineStatus() {
  const { trip } = useTrip();
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [hasPendingCreate, setHasPendingCreate] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    async function check() {
      try {
        const net = await Network.getNetworkStateAsync();
        if (!mounted) return;
        setIsOffline(!(net.isConnected === true && net.isInternetReachable === true));

        const q = await loadQueue();
        const pendingCreate = q.some((item) => item.type === "createTrip");
        setHasPendingCreate(pendingCreate);
      } catch (err) {
        if (!mounted) return;
        setIsOffline(true);
        setHasPendingCreate(false);
      }
    }

    check();
    const id = setInterval(check, 3000);

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const needsBanner =
    Boolean(isOffline) ||
    Boolean(hasPendingCreate) ||
    Boolean(trip ? trip.tripId === null : false);

  return { needsBanner };
}

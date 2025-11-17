import { useEffect, useState } from "react";
import * as Location from "expo-location";

export function useBackgroundPermission() {
  const [granted, setGranted] = useState(true);

  useEffect(() => {
    (async () => {
      const fg = await Location.getForegroundPermissionsAsync();
      const bg = await Location.getBackgroundPermissionsAsync();

      // Background tracking available if BOTH are granted
      const ok = fg.status === "granted" && bg.status === "granted";

      setGranted(ok);
    })();
  }, []);

  return granted;
}

// app/_layout.tsx
import React, { useEffect, useState } from "react";
import { Slot, SplashScreen } from "expo-router";
import "../global.css";

import { hasOnboarded } from "../src/storage/app";
import { configureChannels, attachNotificationListeners } from "../src/services/notifications";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    let removeListeners: (() => void) | null = null;

    async function init() {
      await configureChannels();

      removeListeners = attachNotificationListeners();

      const ob = await hasOnboarded();
      setOnboarded(ob);

      setReady(true);
      await SplashScreen.hideAsync();
    }

    init();

    return () => {
      if (removeListeners) removeListeners();
    };
  }, []);

  if (!ready || onboarded === null) return null;

  // Routing
  return (
    <Slot
      initialRouteName={
        onboarded ? "/(public)/start-trip" : "/(onboarding)/welcome"
      }
    />
  );
}

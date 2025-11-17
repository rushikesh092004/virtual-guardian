// app/_layout.tsx
import React, { useEffect, useState } from "react";
import { Slot, SplashScreen } from "expo-router";
import { router } from "expo-router";

import { hasOnboarded } from "../src/storage/app";
import {
  configureChannels,
  attachNotificationListeners,
} from "../src/services/notifications";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [initialRouteSet, setInitialRouteSet] = useState(false);

  useEffect(() => {
    let removeListeners: (() => void) | null = null;

    async function init() {
      await configureChannels();
      removeListeners = attachNotificationListeners();

      const onboarded = await hasOnboarded();

      // Wait 1 frame to let router mount
      requestAnimationFrame(() => {
        if (onboarded) {
          router.replace("(public)/start-trip");
        } else {
          router.replace("(onboarding)/welcome");
        }
        setInitialRouteSet(true);
      });

      await SplashScreen.hideAsync();
    }

    init();

    return () => {
      if (removeListeners) removeListeners();
    };
  }, []);

  if (!initialRouteSet) return null;

  return <Slot />;
}

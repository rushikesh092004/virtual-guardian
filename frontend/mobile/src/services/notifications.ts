// src/services/notifications.ts
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

/**
 * Configure global notification handler
 * SDK 54 requires: shouldShowBanner + shouldPlaySound + shouldSetBadge
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

/**
 * Ask for permission
 */
export async function requestNotificationPermission(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

/**
 * Schedules a simple “after X seconds” notification.
 *
 * Expo SDK 54 requires:
 * {
 *   type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
 *   seconds: number,
 *   repeats: false
 * }
 */
export async function scheduleReminder(secondsFromNow: number, message: string) {
  if (secondsFromNow <= 0) return;

  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Trip Reminder",
        body: message,
        sound: undefined,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: secondsFromNow,
        repeats: false,
      },
    });
  } catch (err) {
    console.warn("Failed to schedule notification:", err);
  }
}

/**
 * Cancel ALL scheduled notifications.
 */
export async function clearAllNotifications() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (err) {
    console.warn("Failed to clear notifications:", err);
  }
}

/**
 * Optional: create Android channels so reminders are reliable.
 */
export async function configureChannels() {
  if (Platform.OS !== "android") return;

  try {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.DEFAULT,
      enableLights: false,
      enableVibrate: false,
      sound: undefined,
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });
  } catch (err) {
    console.log("Failed to set notification channel:", err);
  }
}

/**
 * Attach listeners if needed in root layout.
 */
export function attachNotificationListeners() {
  const sub1 = Notifications.addNotificationReceivedListener(() => {
    // Handle when a notification arrives foreground
  });

  const sub2 = Notifications.addNotificationResponseReceivedListener(() => {
    // Handle tap actions
  });

  // Return function caller must use to clean up
  return () => {
    sub1.remove();
    sub2.remove();
  };
}

import { Accelerometer } from "expo-sensors";

export type MotionState = "still" | "moving";

let subscription: any = null;
let listeners: Array<(state: MotionState) => void> = [];

let lastState: MotionState = "still";
let stillCounter = 0;
let movingCounter = 0;

export function startMotionDetection() {
  if (subscription) return;

  Accelerometer.setUpdateInterval(400);

  subscription = Accelerometer.addListener((data) => {
    const magnitude = Math.sqrt(
      (data.x || 0) ** 2 + (data.y || 0) ** 2 + (data.z || 0) ** 2
    );

    const threshold = 1.05;

    if (magnitude > threshold) {
      movingCounter++;
      stillCounter = 0;
    } else {
      stillCounter++;
      movingCounter = 0;
    }

    const minSamples = 3;

    if (movingCounter >= minSamples && lastState !== "moving") {
      lastState = "moving";
      listeners.forEach((fn) => fn("moving"));
    }

    if (stillCounter >= minSamples && lastState !== "still") {
      lastState = "still";
      listeners.forEach((fn) => fn("still"));
    }
  });
}

export function stopMotionDetection() {
  if (subscription) {
    subscription.remove();
    subscription = null;
  }
}

export function onMotionChange(fn: (state: MotionState) => void) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}

export function getMotionState(): MotionState {
  return lastState;
}

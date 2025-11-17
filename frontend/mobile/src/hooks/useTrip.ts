import { create } from "zustand";
import { TripHistoryItem, addHistoryItem } from "../storage/history";

export type TripState = {
  tripId: string | null;
  title: string;
  expiresAt: number | null;
  status: "running" | "safe" | "cancelled" | "expired";
  startedAt: number;
};

type Store = {
  trip: TripState | null;
  lastSummary: TripHistoryItem | null;
  startTrip: (data: Omit<TripState, "startedAt">) => void;
  finishTrip: () => void;
  cancelTrip: () => void;
  markExpired: () => void;
};

export const useTrip = create<Store>((set: any, get: any) => ({
  trip: null,
  lastSummary: null,

  startTrip: (data: Omit<TripState, "startedAt">) => {
    const newTrip: TripState = {
      ...data,
      startedAt: Date.now(),
    };
    set({ trip: newTrip });
  },

  finishTrip: () => {
    const t: TripState | null = get().trip;
    if (!t) return;

    const summary: TripHistoryItem = {
      id: typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      title: t.title,
      startedAt: t.startedAt,
      endedAt: Date.now(),
      status: "safe",
    };

    addHistoryItem(summary).catch(() => {});
    set({ trip: null, lastSummary: summary });
  },

  cancelTrip: () => {
    const t: TripState | null = get().trip;
    if (!t) return;

    const summary: TripHistoryItem = {
      id: typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      title: t.title,
      startedAt: t.startedAt,
      endedAt: Date.now(),
      status: "cancelled",
    };

    addHistoryItem(summary).catch(() => {});
    set({ trip: null, lastSummary: summary });
  },

  markExpired: () => {
    const t: TripState | null = get().trip;
    if (!t) return;

    const summary: TripHistoryItem = {
      id: typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      title: t.title,
      startedAt: t.startedAt,
      endedAt: Date.now(),
      status: "expired",
    };

    addHistoryItem(summary).catch(() => {});
    set({ trip: null, lastSummary: summary });
  },
}));

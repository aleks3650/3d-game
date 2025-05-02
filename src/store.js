import { createRef } from "react";
import { create } from "zustand";

export const usePoints = create((set) => ({
  points: [],
  timeStart: 0,
  timeEnd: 0,
  finalNotification: '',
  notification: '',
  addPoint: (num) =>
    set((state) => ({
      points: state.points.includes(num)
        ? state.points
        : [...state.points, num],
    })),
  clearPoints: () => set({ points: [] }),
  clearTime: () => set({timeStart: 0}),
  startPoints: () => set({ points: [0] }),
  setStartTime: (time) => set({timeStart: time}),
  setNotification: (text) => set({notification: text}),
  setFinalNotification: (text) => set({finalNotification: text}),
}));
export const useCarReference = create(() => ({
  carRef: createRef()
}))
import { create } from "zustand";

export const usePoints = create((set) => ({
  points: [],
  timeStart: 0,
  timeEnd: 0,
  notification: '',
  addPoint: (num) =>
    set((state) => ({
      points: state.points.includes(num)
        ? state.points
        : [...state.points, num],
    })),
  clearPoints: () => set({ points: [] }),
  setStartTime: (time) => set({timeStart: time}),
  setNotification: (text) => set({notification: text})
}));

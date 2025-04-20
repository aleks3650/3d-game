import { create } from "zustand";

export const usePoints = create((set) => ({
    points: [],
    addPoint: (num) => set((state) => ({
        points: state.points.includes(num) 
          ? state.points 
          : [...state.points, num]
    })),
    clearPoints: () => set({ points: [] }),
}));


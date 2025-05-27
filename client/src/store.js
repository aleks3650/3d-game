import { create } from "zustand";

export const usePoints = create((set) => ({
  points: [],
  timeStart: 0,
  timeEnd: 0,
  finalNotification: '',
  notification: '',
  addPoint: (num) =>
    set((state) => ({
      points: state.points.includes(num) ? state.points : [...state.points, num],
    })),
  clearPoints: () => set({ points: [] }),
  clearTime: () => set({ timeStart: 0 }),
  startPoints: () => set({ points: [0] }),
  setStartTime: (time) => set({ timeStart: time }),
  setNotification: (text) => set({ notification: text }),
  setFinalNotification: (text) => set({ finalNotification: text }),
}));

export const useCarStore = create((set) => ({
  cars: {},
  localId: null,
  localCarRef: null,
  
  setLocalId: (id) => set({ localId: id }),
  
  setCars: (cars) => set({ cars }),
  
  addCar: (id, position, rotation) => set(state => ({
    cars: { ...state.cars, [id]: { position, rotation } }
  })),
  
  removeCar: (id) => set(state => {
    const newCars = { ...state.cars };
    delete newCars[id];
    return { cars: newCars };
  }),

  setLocalCarRef: (ref) => set({ localCarRef: ref })
}));

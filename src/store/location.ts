import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  locations,
  type FileSystemItem,
  type LocationData,
} from "../constants";

const DEFAULT_LOCATION = locations.work;

type LocationStore = {
  activeLocation: LocationData | FileSystemItem;
  setActiveLocation: (location: LocationData | FileSystemItem) => void;
  resetActiveLocation: () => void;
};

const useLocationStore = create<LocationStore>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,
    setActiveLocation: (location: LocationData | FileSystemItem) =>
      set((state) => {
        state.activeLocation = location;
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  }))
);

export default useLocationStore;

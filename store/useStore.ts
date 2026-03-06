import { create } from 'zustand'

interface FlyTarget {
  longitude: number
  latitude: number
}

interface AppState {
  selectedDate: string | null
  selectedCell: string | null
  panelOpen: boolean
  flyTarget: FlyTarget | null

  setSelectedDate: (date: string | null) => void
  setSelectedCell: (h3Index: string | null) => void
  setPanelOpen: (open: boolean) => void
  openCell: (h3Index: string) => void
  openCellAt: (h3Index: string, lat: number, lng: number) => void
  closePanel: () => void
  clearFlyTarget: () => void
}

export const useStore = create<AppState>((set) => ({
  selectedDate: null,
  selectedCell: null,
  panelOpen: false,
  flyTarget: null,

  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedCell: (h3Index) => set({ selectedCell: h3Index }),
  setPanelOpen: (open) => set({ panelOpen: open }),
  openCell: (h3Index) => set({ selectedCell: h3Index, panelOpen: true }),
  openCellAt: (h3Index, lat, lng) =>
    set({ selectedCell: h3Index, panelOpen: true, flyTarget: { latitude: lat, longitude: lng } }),
  closePanel: () => set({ panelOpen: false, selectedCell: null }),
  clearFlyTarget: () => set({ flyTarget: null }),
}))

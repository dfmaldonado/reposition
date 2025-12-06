import { create } from 'zustand';

export interface OperationItem {
  id: string; 
  operation: string;
  result: string;
  date: string;
}

interface DataStore {
  selectedId: string;
  selectedOperation: string;
  selectedResult: string;
  selectedDate: string;

  history: OperationItem[];

  // Acciones para Detalles
  setSelectedId: (value: string) => void;
  setSelectedOperation: (value: string) => void;
  setSelectedResult: (value: string) => void;
  setSelectedDate: (value: string) => void;

  addToHistory: (item: OperationItem) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<DataStore>((set) => ({
  // Valores iniciales
  selectedId: '',
  selectedOperation: '',
  selectedResult: '',
  selectedDate: '',
  history: [],

  setSelectedId: (value) => set({ selectedId: value }),
  setSelectedOperation: (value) => set({ selectedOperation: value }),
  setSelectedResult: (value) => set({ selectedResult: value }),
  setSelectedDate: (value) => set({ selectedDate: value }),

  addToHistory: (item) => set((state) => ({ 
    history: [item, ...state.history] 
  })),
  
  clearHistory: () => set({ history: [] })
}));
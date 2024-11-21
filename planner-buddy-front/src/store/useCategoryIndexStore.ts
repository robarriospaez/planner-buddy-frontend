import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CategoryIndex {
  [category: string]: number;
}

interface Indexes {
  [eventId: string]: CategoryIndex;
}

interface CategoryIndexState {
  indexes: Indexes;
  setIndex: (eventId: string, category: string, index: number) => void;
  getIndex: (eventId: string, category: string) => number;
}

const useCategoryIndexStore = create(
  persist<CategoryIndexState>(
    (set, get) => ({
      indexes: {},
      setIndex: (eventId, category, index) => set((state) => ({
        indexes: {
          ...state.indexes,
          [eventId]: {
            ...(state.indexes[eventId] || {}),
            [category]: index
          }
        }
      })),
      getIndex: (eventId, category) => {
        const state = get();
        return state.indexes[eventId]?.[category] ?? 0;
      },
    }),
    {
      name: 'category-index-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCategoryIndexStore;
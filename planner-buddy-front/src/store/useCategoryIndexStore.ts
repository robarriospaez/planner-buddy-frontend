import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useCategoryIndexStore = create(
  persist(
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
        return state.indexes[eventId]?.[category] || 0;
      },
    }),
    {
      name: 'category-index-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCategoryIndexStore;
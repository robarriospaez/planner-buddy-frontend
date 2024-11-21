import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface setIndex {
  eventId: string;
  category: string;
  index: number;
}

interface getIndex {
  eventId: string;
  category: string;
}

interface IState {
  indexes: {
    [eventId: string]: {
      [category: string]: number;
    };
  };
}

const useCategoryIndexStore = create(
  persist(
    (set, get) => ({
      indexes: {},
      setIndex: ({eventId, category, index}: setIndex) => set((state: IState) => ({
        indexes: {
          ...state.indexes,
          [eventId]: {
            ...(state.indexes[eventId] || {}),
            [category]: index
          }
        }
      })),
      getIndex: ({eventId, category}: getIndex) => {
        const state: any = get();
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
import { create } from 'zustand';

const useUserStore = create((set) => ({
  userId: typeof window !== 'undefined' ? Number(localStorage.getItem('userId')) : null,
  setUserId: (id) => {
    localStorage.setItem('userId', id); 
    set({ userId: Number(id) });
  },
}));

export default useUserStore;

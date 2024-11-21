import { create } from 'zustand';

interface IUser {
  userId: number | null;
  setUserId: (id: string) => void;
}

const useUserStore = create<IUser>((set) => ({
  userId: typeof window !== 'undefined' ? Number(localStorage.getItem('userId')) : null,
  setUserId: (id) => {
    localStorage.setItem('userId', id); 
    set({ userId: Number(id) });
  },
}));

export default useUserStore;

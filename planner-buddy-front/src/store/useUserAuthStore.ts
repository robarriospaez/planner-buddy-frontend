import { create } from 'zustand';

const useUserAuthStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));

export default useUserAuthStore;

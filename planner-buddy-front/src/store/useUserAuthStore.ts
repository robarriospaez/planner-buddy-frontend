import { create } from 'zustand';

interface User { 
  id?: string;
  email?: string;
  name?: string;
}

interface UserAuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserAuthStore = create<UserAuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));

export default useUserAuthStore;

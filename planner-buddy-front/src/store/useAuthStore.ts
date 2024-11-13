import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const deleteCookies = () => {
    document.cookie.split(";").forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  };

const useAuthStore = create(
    persist(
        (set) => ({
            id: null,
            token: null,
            isAuthenticated: false,
            login: (token) => set({ token, isAuthenticated: true }),
            logout: () => {
                deleteCookies();
                localStorage.clear();
              },
            publicRoutes: ['/login', '/register', '/'],
        }),
        {
            name: 'auth-storage',
            getStorage: () => (typeof window !== 'undefined' ? localStorage : null),
        }
    )
)

export default useAuthStore
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Definir la estructura del estado de autenticación
interface AuthState {
  id: string | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  publicRoutes: string[];
}

// Función de eliminación de cookies con tipado seguro
const deleteCookies = (): void => {
  if (typeof document !== 'undefined') {
    document.cookie.split(";").forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  }
};

// Crear la tienda con soporte de TypeScript
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      id: null,
      token: null,
      isAuthenticated: false,
      login: (token) => set({ token, isAuthenticated: true }),
      logout: () => {
        deleteCookies();
        if (typeof localStorage !== 'undefined') {
          localStorage.clear();
        }
        set({ 
          id: null, 
          token: null, 
          isAuthenticated: false 
        });
      },
      publicRoutes: ['/login', '/register', '/'],
    }),
    {
      name: 'auth-storage', // nombre de la clave en el almacenamiento
      storage: createJSONStorage(() => localStorage), // usar almacenamiento de localStorage
      // agregar partialize si quiero guardar solo ciertas partes del estado
      // seria algo como esto --> partialize: (state) => ({ token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export default useAuthStore;
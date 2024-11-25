import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { ComponentType, FC } from 'react';

// Definimos un tipo para las props que esperamos recibir
interface WithAuthProps {
  userToken: string | null;
}

// Definimos el tipo de retorno de la función withAuth
type WithAuthComponent<P> = FC<P & WithAuthProps> & {
  displayName?: string;
};

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): WithAuthComponent<P> => {
  const WithAuth: WithAuthComponent<P> = (props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const userToken = useAuthStore((state) => state.token);
    const router = useRouter();

    useEffect(() => {
      const storedToken = localStorage.getItem('auth-storage');
      if (!storedToken && !isAuthenticated) {
        // Redirigir al login si no hay token y no está autenticado
        router.replace('/login');
      } else {
        setIsLoading(false);
      }
    }, [isAuthenticated, router]);

    // Espera a que isLoading sea false antes de renderizar el contenido
    if (isLoading) {
      return (
        <div className="bg-gradient-to-b from-violet-500 to-violet-200 w-full h-screen flex justify-center items-center min-h-full">
          <div className="relative w-16 h-16">
            <div className="w-full h-full border-4 border-purple-900 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 m-auto w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin-slow"></div>
            <div className="absolute inset-0 m-auto w-8 h-8 border-4 border-purple-300 border-t-transparent rounded-full animate-spin-reverse"></div>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} userToken={userToken} />;
  };

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithAuth.displayName = `WithAuth(${displayName})`;

  return WithAuth;
};

export default withAuth;

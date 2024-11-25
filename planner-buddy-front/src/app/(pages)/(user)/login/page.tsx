"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";

interface LoginData {
  email: string;
  password: string;
}

interface ApiResponse {
  data: {
    id: string;
    token: string;
  };
}

interface Event {
  eventId: string;
  // Añade aquí otras propiedades del evento si las hay
}

interface EventsApiResponse {
  data: Event[];
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = useAuthStore((state) => state.login);
  const setUserId = useUserStore((state) => state.setUserId);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

  const fetchUserEvents = async (userId: string) => {
    if (!userId) {
      console.error('User ID not found');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/events/users/${userId}`);
      const result: EventsApiResponse = await response.json();
      
      if (Array.isArray(result.data)) {
        const eventIds = result.data.map((event: Event) => event.eventId);
        localStorage.setItem('eventIds', JSON.stringify(eventIds));
      }
    } catch (error) {
      console.error('Error fetching user events:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const userData: LoginData = { email, password };

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error en la solicitud: ${errorText}`);
      }

      const data: ApiResponse = await res.json();
      
      setUserId(data.data.id);
      await fetchUserEvents(data.data.id);
      
      login(data.data.token);
      router.push("/home");
    } catch (error) {
      setErrorMessage("Error al iniciar sesión. Verifica tus credenciales.");
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="bg-gradient-to-b from-violet-500 to-violet-200 place-items-center flex-1 flex flex-col h-full min-h-screen items-center">
          <section className="py-10 text-center">
            <div className="w-full h-screen flex justify-center items-center min-h-full">
              <div className="relative w-16 h-16">
                <div className="w-full h-full border-4 border-purple-900 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 m-auto w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin-slow"></div>
                <div className="absolute inset-0 m-auto w-8 h-8 border-4 border-purple-300 border-t-transparent rounded-full animate-spin-reverse"></div>
              </div>
            </div>
          </section>
        </div>
      )}
      {!isLoading && (
        <div className="flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="w-full max-w-md p-8 bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
            {errorMessage && (
              <div className="mb-4 text-red-500 text-sm font-medium">
                {errorMessage}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full p-3 bg-white border border-gray-300 rounded-3xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full p-3 bg-white border border-gray-300 rounded-3xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                Iniciar sesión
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-600">
              Si no tienes una cuenta{" "}
              <a href="/register" className="text-indigo-600 hover:underline">
                Regístrate
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;



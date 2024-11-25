"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  password: string;
}

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const birthDateObject = new Date(birthDate);

    const userData: UserData = {
      username,
      firstName,
      lastName,
      email,
      birthDate: birthDateObject,
      password,
    };

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error en el registro");
      }

      const data = await res.json();
      console.log("Usuario registrado:", data);
      router.push("/login");
    } catch (error) {
      console.error("Ocurrió un error:", error);
      setErrorMessage((error as Error).message || "Error inesperado. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(e.target.value);
  };

  return (
    <>
      {loading && (
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

      {!loading && (
        <div className="flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="w-screen md:w-full max-w-md p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Registro</h2>

            {errorMessage && (
              <div className="mb-4 text-red-500 bg-red-100 p-2 rounded-md">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre:
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => handleInputChange(e, setFirstName)}
                  className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellido:
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => handleInputChange(e, setLastName)}
                  className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de Usuario(*):
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => handleInputChange(e, setUsername)}
                  className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="birthDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de Nacimiento(*):
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={birthDate}
                  onChange={(e) => handleInputChange(e, setBirthDate)}
                  className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email(*):
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => handleInputChange(e, setEmail)}
                  className="mt-1 block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-m font-medium text-gray-700"
                >
                  Contraseña(*):
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => handleInputChange(e, setPassword)}
                  className="mt-1 block w-full p-3 border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                  required
                />
              </div>

              <p className="text-sm text-slate-500">
                Los campos con (*) son obligatorios
              </p>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                Registrarse
              </button>
            </form>

            <p className="mt-4 text-sm text-gray-600">
              Si ya tienes una cuenta,{" "}
              <a href="/login" className="text-indigo-600 hover:underline">
                Iniciar Sesion
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
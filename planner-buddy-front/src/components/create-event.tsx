"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";
import useEventStore from "@/store/useEventStore";
import Cookies from "js-cookie";



const CreateEvent = () => {
  const { userId } = useUserStore();
  const router = useRouter();
  const setEventId = useEventStore((state) => state.setEventId);
  const [loader, setLoader] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
    plannedDate: "",
    password: "",
    userId,
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    setEventData((prevData) => ({
      ...prevData,
      userId,
    }));
  }, [userId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    router.push(`/events`);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    setLoader(true);

    try {
      // Crear el evento
      const response = await fetch(`${API_URL}/createEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (response.ok) {
        setEventId(result.data.id); // Ajustar según el formato de la respuesta
        setMessage({ type: "success", text: "Evento creado con éxito." });

        // Unirse al evento
        const joinResponse = await fetch(`${API_URL}/joinEvent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: result.data.id,
            password: eventData.password,
            userId,
          }),
        });

        const joinResult = await joinResponse.json();

        if (joinResponse.ok) {
          // Obtener la cookie de 'eventIds' y parsearla como un array de números
          const eventIdsArray = Cookies.get("eventIds")
            ? JSON.parse(Cookies.get("eventIds") as string).map(Number)
            : []; // Si no existe, devolvemos un array vacío

          // Agregar el nuevo eventId si no está ya en el array
          const newEventId = joinResult.data.id; // Usa el ID del evento del resultado
          if (!eventIdsArray.includes(newEventId)) {
            const updatedEventIds = [...eventIdsArray, newEventId];

            // Guardar el array actualizado en la cookie (usando JSON)
            Cookies.set("eventIds", JSON.stringify(updatedEventIds), {
              expires: 7,
            }); // Expira en 7 días, puedes ajustarlo
          }

          setMessage((prev) => ({
            ...prev,
            type: "success",
            text: "Te has unido al evento con éxito.",
          }));
          router.push(`/events/${newEventId}`);    // Redirigir al evento
        } else if (joinResponse.status === 409) {
          // Manejar conflicto
          setMessage({
            type: "error",
            text: joinResult.message || "Error: ya estás unido a este evento.",
          });
        } else {
          setMessage({ type: "error", text: "Error al unirse al evento." });
        }
      } else {
        setMessage({ type: "error", text: "Error al crear el evento." });
      }
    } catch (error) {
      console.log(error);
      setMessage({
        type: "error",
        text: "Hubo un problema con el servidor. Intenta más tarde.",
      });
    } finally {
      setLoader(false); // Desactivar el loader
    }
  };

  return (
    <section className="bg-gray-100 px-10 py-5 my-5 rounded-lg shadow-lg w-full max-w-md mx-auto">
      {loader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="relative w-24 h-24 rounded-lg flex items-center justify-center">
            <div className="w-full h-full border-4 border-t-transparent rounded-full animate-spin border-purple-500"></div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-extrabold text-center mb-6 text-violet-700">
        Crear un nuevo evento
      </h1>

      {/* Mostrar mensajes de éxito o error */}
      {message.text && (
        <div
          className={`mb-4 text-center p-2 rounded-lg ${message.type === "success"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
            }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            Nombre del Evento
          </label>
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            Fecha del Evento
          </label>
          <input
            type="date"
            name="plannedDate"
            value={eventData.plannedDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            Contraseña del Evento
          </label>
          <input
            type="password"
            name="password"
            value={eventData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-violet-600 text-white w-full py-3 rounded-lg font-semibold text-lg hover:bg-violet-800 hover:text-white transition duration-200"
        >
          Crear Evento
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="bg-violet-200 text-violet-600 px-4 py-2 mb-4 rounded-lg text-lg font-semibold hover:bg-red-500 hover:text-white cursor-pointer w-full mt-4 transition duration-200"
        >
          Cerrar ventana
        </button>
      </form>
    </section>
  );
};

export default CreateEvent;

"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore.js";
import Cookies from "js-cookie";

interface EventData {
  password: string;
  id: string;
  userId: string | number | null;
}

interface Message {
  type: "success" | "error" | "";
  text: string;
}

const JoinEvent: React.FC = () => {
  const router = useRouter();
  const { userId } = useUserStore();
  const [loader, setLoader] = useState<boolean>(false);
  const [eventData, setEventData] = useState<EventData>({
    password: "",
    id: "",
    userId: userId ?? "",
  });
  const [message, setMessage] = useState<Message>({ type: "", text: "" });

  const handleClose = () => {
    router.push(`/events`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoader(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(`${API_URL}/joinEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...eventData,
          userId: eventData.userId?.toString() ?? "",
        }),
      });

      if (response.ok) {
        const joinResult = await response.json();
        setMessage({
          type: "success",
          text: "Te has unido al evento con éxito.",
        });

        // Obtener y actualizar la cookie 'eventIds'
        const eventIdsArray = Cookies.get("eventIds")
          ? JSON.parse(Cookies.get("eventIds") as string).map(Number)
          : [];

        const newEventId = joinResult.data.id;
        if (!eventIdsArray.includes(newEventId)) {
          const updatedEventIds = [...eventIdsArray, newEventId];
          Cookies.set("eventIds", JSON.stringify(updatedEventIds), {
            expires: 7,
          });
        }

        router.push(`/events/${joinResult.data.id}`);
      } else if (response.status === 409) {
        const joinResult = await response.json();
        setMessage({
          type: "error",
          text: joinResult.message || "Error: ya estás unido a este evento.",
        });
      } else {
        setMessage({
          type: "error",
          text: "Error al unirse al evento. Intenta nuevamente.",
        });
      }
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "Hubo un problema con el servidor. Intenta más tarde.",
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <section className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h1 className="text-2xl font-extrabold text-center mb-6 text-violet-700">
        Unirse a Evento
      </h1>

      {loader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="relative w-24 h-24 rounded-lg flex items-center justify-center">
            <div className="w-full h-full border-4 border-t-transparent rounded-full animate-spin border-purple-500"></div>
          </div>
        </div>
      )}

      {message.text && (
        <div
          className={`mb-4 text-center p-2 rounded-lg ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="event-id"
            className="block text-gray-700 font-bold mb-2"
          >
            Id del Evento
          </label>
          <input
            id="event-id"
            type="number"
            name="id"
            value={eventData.id}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="event-password"
            className="block text-gray-700 font-bold mb-2"
          >
            Contraseña del Evento
          </label>
          <input
            id="event-password"
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
          Unirse al Evento
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

export default JoinEvent;

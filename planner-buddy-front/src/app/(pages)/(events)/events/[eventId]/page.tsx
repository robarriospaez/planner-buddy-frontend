"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/components/withAuth";
import useUserStore from "@/store/useUserStore";
import DecisionManager from "@/components/decision";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface EventUser {
  id: string;
  username: string;
}

interface Event {
  name: string;
  plannedDate: string;
  userId: string;
}

interface EventPageProps {
  params: {
    eventId: string;
  };
}

interface ApiEventUserData {
  user: {
    id: string;
    username: string;
  };
}

const EventPage: React.FC<EventPageProps> = ({ params }) => {
  const { eventId } = params;
  const { userId } = useUserStore();
  const router = useRouter();
  const [eventUsers, setEventUsers] = useState<EventUser[]>([]);
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [event, setEvent] = useState<Event | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const goToCategories = () => {
    router.push(`/events/${eventId}/categories`);
  };
  const goToResult = () => {
    router.push(`/events/${eventId}/result`);
  };
  const handleGoToEvent = () => {
    router.push(`/events/${eventId}`);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const utcDate = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    );

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };
    return utcDate.toLocaleDateString("es-ES", options);
  };

  useEffect(() => {
    const fetchEventUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/events/${eventId}/users`);
        const result = await response.json();
        console.log("Event users:", result);

        if (Array.isArray(result.data)) {
          const users: EventUser[] = result.data.map(
            (item: ApiEventUserData) => ({
              id: item.user.id,
              username: item.user.username,
            })
          );
          setEventUsers(users);

          const event = await fetch(`${API_URL}/events/${eventId}`);
          const eventData = await event.json();
          console.log("Event data:", eventData);
          setIsCreator(userId === eventData.data.userId);
          setEvent(eventData.data);
        }
      } catch (error) {
        console.error("Error fetching event users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventUsers();
  }, [eventId, userId]);

  const deleteEvent = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          eventId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Event ${eventId} deleted successfully:`, data);
      const eventIdsCookie = Cookies.get("eventIds");
      if (eventIdsCookie) {
        let eventIds: string[] = JSON.parse(eventIdsCookie);
        eventIds = eventIds.filter((id) => id !== eventId);
        Cookies.set("eventIds", JSON.stringify(eventIds), { expires: 7 });
      }
      router.push(`/events`);
    } catch (error) {
      console.error(`Error deleting event: ${eventId}`, error);
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const leaveEvent = async () => {
    try {
      const response = await fetch(
        `${API_URL}/events/${eventId}/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            eventId,
          }),
        }
      );

      const data = await response.json();
      console.log(`Event ${eventId} left successfully:`, data);
      handleGoToEvent();
    } catch (error) {
      console.error(`Error leaving event: ${eventId}`, error);
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      }
    }
  };

  return (
    <section className="p-5 bg-gradient-to-b from-violet-600 to-violet-300 min-h-screen w-full flex flex-wrap items-center justify-center rounded-lg">
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="relative w-24 h-24 rounded-lg flex items-center justify-center">
            <div
              className={`w-full h-full border-4 border-t-transparent rounded-full animate-spin border-violet-500`}
            ></div>
            <div
              className={`absolute inset-0 m-auto w-12 h-12 border-4 border-t-transparent rounded-full animate-spin-slow border-violet-300`}
            ></div>
            <div
              className={`absolute inset-0 m-auto w-8 h-8 border-4  border-t-transparent rounded-full animate-spin-reverse border-violet-100`}
            ></div>
          </div>
        </div>
      )}

      {isLoading && (
        <>
          <div className="relative block w-16 h-16">
            <div className="w-full h-full border-4 border-purple-900 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 m-auto w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin-slow"></div>
            <div className="absolute inset-0 m-auto w-8 h-8 border-4 border-purple-300 border-t-transparent rounded-full animate-spin-reverse"></div>
          </div>
        </>
      )}
      {!isLoading && event && (
        <article className="max-w-4xl w-full mx-auto">
          <h1 className="pt-3 text-xl md:text-3xl lg:text-5xl font-extrabold text-center text-white mb-8 capitalize">
            {event.name}
          </h1>
          <h2 className="pt-3 text-base md:text-2xl font-extrabold text-center text-white mb-8">
            {formatDate(event.plannedDate)}
          </h2>
          <div className="text-center p-6 rounded-lg shadow-md">
            <p className="text-xl font-semibold mb-2">
              ¡Pásales este ID a tus amigos para que se unan!
            </p>
            <p className="text-3xl font-bold text-white mb-4">{eventId}</p>
            <p className="text-base text-black">
              Psst... ¡acordate de pasarles la contraseña!
            </p>
          </div>

          <section className="bg-white p-10 rounded-lg shadow-xl">
            <h2 className="text-4xl font-bold text-center text-violet-900 mb-8">
              Miembros del Evento
            </h2>

            <div className="my-10">
              <nav>
                <ul className="flex flex-wrap justify-center gap-6">
                  {eventUsers.length === 0 ? (
                    <p className="text-lg font-semibold text-gray-700">
                      No tienes miembros disponibles.
                    </p>
                  ) : (
                    eventUsers.map((user) => (
                      <li
                        key={user.id}
                        className="text-2xl bg-violet-200 text-black font-bold py-2 px-6 rounded-lg shadow-md cursor-default"
                      >
                        {user.username}
                      </li>
                    ))
                  )}
                </ul>
              </nav>
            </div>

            <h2 className="text-3xl font-bold text-center text-violet-900 mb-12">
              ¡Empieza a planear!
            </h2>

            <DecisionManager eventId={eventId} creator={isCreator} />
            <div className="flex flex-wrap items-center justify-center gap-6 my-6">
              <button
                onClick={goToCategories}
                className="w-60 bg-violet-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-violet-700 transition duration-300 shadow-md text-center"
              >
                Categorías
              </button>
              <button
                onClick={goToResult}
                className="w-60 bg-violet-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-violet-700 transition duration-300 shadow-md text-center"
              >
                Ir a Resultados
              </button>
              {isCreator ? (
                <button
                  onClick={deleteEvent}
                  className="w-60 bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition duration-300 shadow-md text-center"
                >
                  Eliminar Evento
                </button>
              ) : (
                <button
                  onClick={leaveEvent}
                  className="w-60 bg-violet-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md text-center"
                >
                  Salir del Evento
                </button>
              )}
            </div>
          </section>
        </article>
      )}
    </section>
  );
};

export default withAuth(EventPage);

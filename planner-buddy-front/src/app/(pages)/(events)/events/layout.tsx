"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import withAuth from "@/components/withAuth.js";
import { useRouter } from "next/navigation";
import "@/styles/custom-scrollbar.css";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

function EventsLayout({ children }) {
  const [userEvents, setUserEvents] = useState([]);
  const [cookiesEvent, setCookiesEvent] = useState([]);
  const [loader, setLoader] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserEvents = async () => {
      setLoader(true);
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('User ID not found in local storage');
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/events/users/${userId}`);
        const result = await response.json();
        console.log('User events:', result);

        if (Array.isArray(result.data)) {
          const events = result.data.map(item => ({
            id: item.event.id,
            name: item.event.name
          }));

          setUserEvents(events);

          // Actualiza las cookies si los eventos han cambiado
          const eventIds = events.map(event => event.id);
          Cookies.set('eventIds', JSON.stringify(eventIds), { expires: 7 });
        } else {
          console.error('Error: Unexpected data format');
        }
      } catch (error) {
        console.error('Error fetching user events:', error);
      } finally {
        setLoader(false);
      }
    };

    fetchUserEvents();
  }, [router]);

  useEffect(() => {
    const eventIdsFromCookies = Cookies.get("eventIds");
    if (eventIdsFromCookies) {
      const parsedEventIds = JSON.parse(eventIdsFromCookies);
      setCookiesEvent(parsedEventIds);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const eventIdsFromCookies = Cookies.get("eventIds");
      if (eventIdsFromCookies) {
        const parsedEventIds = JSON.parse(eventIdsFromCookies);
        setCookiesEvent(parsedEventIds);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleEventClick = (eventId) => {
    console.log('Navigating to event with ID:', eventId);
    if (eventId) {
      router.push(`/events/${eventId}`);
    } else {
      console.error('Invalid event ID');
    }
  };

  return (
    <>
      <Navbar />

      {loader && (
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

      {!loader && userEvents.length === 0 && cookiesEvent.length === 0 && (
        <div className="bg-violet-400 place-items-center flex-1 flex flex-col h-full min-h-screen items-center">
          <section className="py-10 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
              ¡Todavía no tienes eventos!
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl text-white font-semibold opacity-90 mb-6">
              ¡Empieza a planear ya!
            </h3>
          </section>
          {children}
        </div>
      )}

      {!loader && (userEvents.length > 0 || cookiesEvent.length > 0) && (
        <div className="flex flex-col bg-gradient-to-b from-violet-200 to-violet-200 mx-auto p-4 gap-4 h-full min-h-screen lg:flex-row">
          <aside className="bg-violet-500 lg:max-w-64 px-5 grid rounded-lg relative order-1 lg:order-0 h-full">
          {/* <aside className="custom-scrollbar bg-violet-600 lg:max-w-72 px-5 grid rounded-lg relative order-1 lg:order-0 h-screen overflow-y-auto"> */}

            <nav>
              <ul className="flex flex-col py-5 my-5 gap-10 sticky top-12">
                <span className="top-4 left-4">
                  <h1 className="text-xl p-1 text-center overflow-hidden text-violet-900">
                    Selecciona un evento para verlo
                  </h1>
                </span>

                {userEvents
                  .slice()
                  .reverse()
                  .map((event) => (
                    <li key={event.id}>
                      <button
                        onClick={() => handleEventClick(event.id)}
                        className="text-center text-3xl md:text-xl bg-violet-400 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded w-full overflow-hidden capitalize"
                      >
                        {event.name}
                      </button>
                    </li>
                  ))}
              </ul>
            </nav>
          </aside>

          <div className="bg-violet-400 place-items-center flex-1 flex items-center rounded-lg order-0 lg:order-1 justify-center">
            {children}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default withAuth(EventsLayout);

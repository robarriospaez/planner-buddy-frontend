'use client';

import { useRouter } from "next/navigation";
import withAuth from "@/components/withAuth.js";
import LikedItemsChart from "@/components/result.js";
import DecisionManager from "@/components/decision.js";
import { useState, useEffect } from "react";
import useUserStore from "@/store/useUserStore.js";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


const DecisionPage = ({ params }) => {
  const router = useRouter();
  const { eventId } = params;
  const { userId } = useUserStore();
  const [isCreator, setIsCreator] = useState();
  
  const goToEvent = () => {
    router.push(`/events/${eventId}`);
  };


//* */

useEffect(() => {
    const getEventInfo = async () => {
      try {
        const response = await fetch(`${API_URL}/events/${eventId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log(`Event ${eventId} retrieved successfully:`, data);
        
        setIsCreator(userId === data.data.userId);
        console.log('isCreator', isCreator);
      } catch (error) {
        console.error(`Error getting event: ${eventId}`, error);
        console.error("Error details:", error.message);
      }
    };

    getEventInfo();
  }, []);

//* */


  return (
    <section className="p-3">
      <DecisionManager eventId={eventId} creator={isCreator} />
      <section className="h-full min-h-screen bg-violet-400 rounded-lg w-full relative justify-evenly flex flex-col md:flex-row gap-8 my-8">
        <LikedItemsChart eventId={eventId} category={'movies'}  />
        <LikedItemsChart eventId={eventId} category={'meals'} />
        <LikedItemsChart eventId={eventId} category={'places'} />
      </section>
      <div className="flex flex-col items-center justify-center gap-8 py-8 lg:flex-row">
        <button
          onClick={goToEvent}
          className="bg-white text-violet-600 px-6 py-3 rounded-full md:text-lg font-semibold hover:bg-gray-100"
        >
          Volver al Evento
        </button>
      </div>
    </section>
  );
};

export default withAuth(DecisionPage);

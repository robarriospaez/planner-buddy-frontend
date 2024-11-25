"use client";
import React from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/components/withAuth";
import Image from "next/image";

const Events = () => {
  const router = useRouter();

  const createEvent = () => {
    router.push(`/events/createEvent`);
  };

  const joinEvent = () => {
    router.push(`/events/joinEvent`);
  };

  return (
    <section className=" bg-violet-400 place-items-center rounded-lg h-full min-h-screen">
      <div className="mt-20 lg:mt-0 flex flex-col items-center justify-center gap-8 md:flex-row h-full">
        <div className="flex flex-col items-center justify-center gap-8">
          <Image
            src="/utils/create-event.png"
            alt="Imagen Crear Evento"
            width={150}
            height={150}
            className="rounded-lg"
          />

          <button
            onClick={createEvent}
            className="bg-white text-violet-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100"
          >
            Crear Evento
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
          <Image
            src="/utils/join-event.png"
            alt="Imagen Crear Evento"
            width={150}
            height={150}
            className="rounded-lg"
          />
          <button
            onClick={joinEvent}
            className="bg-white text-violet-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100"
          >
            Unirse a Evento
          </button>
        </div>
      </div>
    </section>
  );
};

export default withAuth(Events);
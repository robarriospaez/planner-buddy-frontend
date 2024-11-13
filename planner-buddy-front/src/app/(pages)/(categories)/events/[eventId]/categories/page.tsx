"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ItemCard from "@/components/item-card";
import withAuth from '@/components/withAuth.js'

const Categories = ({ params }) => {
  const router = useRouter();
  const { eventId } = params;

  const goToEvent = () => {
    router.push(`/events/${eventId}`);
  };
  const ready = () => {
    router.push(`/events/${eventId}/result`);
  };


  return (
    <section className="h-full bg-violet-400 grid place-items-center flex-1 pb-8"  >
      <h1 className="text-3xl mt-10 font-bold text-center mb-12 text-white hover:text-[#130606df] hover:scale-105 transition-transform duration-300">
        Categorías del Evento {eventId}
      </h1> 
      <section className="h-full flex align-center py-20 mb-12 bg-gray-100 rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Empezá a elegir dentro de cada categoría.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            <a href="categories/movies">
              <ItemCard
                category="Peliculas"
                description="¿Que quisieras ver?"
                imageUrl="https://cdn-icons-png.flaticon.com/512/7295/7295380.png"
              />
            </a>
            <a href="categories/meals">
              <ItemCard
                category="Comidas"
                description="Mmmmm... ¿Que quiero comer hoy?"
                imageUrl="https://cdn-icons-png.flaticon.com/512/4359/4359642.png"
              />
            </a>
            <a href="categories/places">
              <ItemCard
                category="Lugares"
                description="¿Donde vamos?"
                imageUrl="https://cdn-icons-png.flaticon.com/512/11074/11074673.png"
              />
            </a>
          </div>
        </div>
      </section>
      <div className="flex flex-row items-center justify-center gap-8">
      <button onClick={goToEvent}>
        <a className="bg-white text-violet-600 px-6 py-3 rounded-full text-lg my-10 font-semibold hover:bg-gray-100">
          Ir Atrás
        </a>
      </button>
      <button onClick={ready}>
        <a className="bg-white text-violet-600 px-6 py-3 rounded-full text-lg my-10 font-semibold hover:bg-gray-100">
          Ir a Resultado
        </a>
      </button>
      </div>
    </section>
  );
};

export default withAuth(Categories);

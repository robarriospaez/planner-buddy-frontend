'use client';

import React, { useState, useEffect } from "react";
import withAuth from "@/components/withAuth";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ItemCard from "@/components/item-card";

// Definir el tipo de la respuesta de la API
interface Place {
  id: number;
  title: string;
  urlImage: string;
  description: string; // Descripción que posiblemente venga de la API
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const PlacesCatalogPage: React.FC = () => {
  // Definir el tipo de estado `places` como un array de `Place`
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const url = `${API_URL}/places`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const fetchPlaces = async () => {
      try {
        const response = await fetch(url, options);
        const result: Place[] = await response.json(); // Especificamos que el resultado es un array de `Place`

        // Ajustar el formato para coincidir con la interfaz Place
        const formattedPlaces = result.map((place) => ({
          id: place.id,
          title: place.title,
          urlImage: place.urlImage,
          description: place.description,
        }));

        console.log(formattedPlaces);
        setPlaces(formattedPlaces);
      } catch (error) {
        console.error("Error al obtener los lugares:", error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div>
      <Navbar />

      {/* Features Section */}
      <section className="py-20 bg-violet-200 h-full min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explora los distintos lugares que puedes elegir!
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {places.map((place) => (
              <ItemCard
                key={place.id}
                category={place.title} // usamos 'title' porque es lo que nos da la API
                description={place.description}
                imageUrl={place.urlImage}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default withAuth(PlacesCatalogPage);

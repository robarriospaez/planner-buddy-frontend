"use client";
import SwipeableCard from "@/components/swipeable-card";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import withAuth from "@/components/withAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type APIPlace = {
  id: string;
  title: string;
  urlImage: string;
};

type Place = {
  id: string;
  name: string;
  urlImage: string;
};

type PlacesProps = {
  params: {
    eventId: string;
  };
};

const Places: React.FC<PlacesProps> = ({ params }) => {
  const router = useRouter();
  const [places, setPlaces] = useState<Place[]>([]);
  const { eventId } = params;

  const goToCategories = () => {
    router.push(`../categories`);
  };

  useEffect(() => {
    const url = `${API_URL}/places`;
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const fetchPlaces = async () => {
      try {
        const response = await fetch(url, options);
        const result: APIPlace[] = await response.json();

        const formattedPlaces: Place[] = result.map((place) => ({
          id: place.id,
          name: place.title,
          urlImage: place.urlImage,
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
    <section className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-violet-400">
      <h1 className="text-3xl font-bold text-center mb-12">Lugares</h1>

      <div>
        <SwipeableCard items={places} category="places" eventId={eventId} />
      </div>

      <button
        onClick={goToCategories}
        className="max-w-32 text-center bg-white text-violet-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 m-5"
      >
        Ir Atrás
      </button>
    </section>
  );
};

export default withAuth(Places);

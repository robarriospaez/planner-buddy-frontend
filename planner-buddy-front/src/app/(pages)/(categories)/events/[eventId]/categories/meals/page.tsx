"use client";
import SwipeableCard from "@/components/swipeable-card";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import withAuth from "@/components/withAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type APIMeal = {
  id: string;
  name: string;
  urlImage: string;
};

type Meal = {
  id: string;
  name: string;
  urlImage: string;
};

type MealsProps = {
  params: {
    eventId: string;
  };
};

const Meals: React.FC<MealsProps> = ({ params }) => {
  const router = useRouter();
  const [meals, setMeals] = useState<Meal[]>([]);
  const { eventId } = params;

  const goToCategories = () => {
    router.push(`../categories`);
  };

  useEffect(() => {
    const url = `${API_URL}/meals`;
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const fetchMeals = async () => {
      try {
        const response = await fetch(url, options);
        const result: APIMeal[] = await response.json();

        const formattedMeals: Meal[] = result.map((meal) => ({
          id: meal.id,
          name: meal.name,
          urlImage: meal.urlImage,
        }));

        console.log("Se obtuvieron las comidas");
        setMeals(formattedMeals);
      } catch (error) {
        console.error("Error al obtener las comidas:", error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <section className="w-full h-full min-h-screen flex flex-col items-center justify-center bg-violet-400">
      <h1 className="text-3xl font-bold text-center mb-12">Comidas</h1>

      <div>
        <SwipeableCard items={meals} category="meals" eventId={eventId} />
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

export default withAuth(Meals);


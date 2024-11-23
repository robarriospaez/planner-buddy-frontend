'use client';
import React, { useState, useEffect } from "react";
import withAuth from "@/components/withAuth";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ItemCard from "@/components/item-card";

// Definir el tipo para las comidas (Meal)
interface Meal {
  id: number;
  name: string;
  urlImage: string;
  description?: string; // Descripción es opcional
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const MealsCatalogPage: React.FC = () => {
  // Estado para almacenar las comidas
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const url = `${API_URL}/meals`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    };

    // Función para obtener las comidas desde la API
    const fetchMeals = async () => {
      try {
        const response = await fetch(url, options);
        const result: Meal[] = await response.json();

        // Formatear las comidas para que tengan la estructura correcta
        const formattedMeals = result.map((meal) => ({
          id: meal.id,
          name: meal.name,
          urlImage: meal.urlImage,
          description: meal.description || "", // Si no hay descripción, asignar una cadena vacía
        }));

        console.log(formattedMeals);
        setMeals(formattedMeals);
      } catch (error) {
        console.error("Error al obtener las comidas:", error); // Manejo de errores
      }
    };

    fetchMeals();
  }, []);

  return (
    <div>
      <Navbar /> { }

      {/* Sección de comidas */}
      <section className="py-20 bg-violet-200 h-full min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explora las distintas comidas que puedes elegir!
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {/* Mapeamos las comidas y las pasamos como props a 'ItemCard' */}
            {meals.map((meal) => (
              <ItemCard
                key={meal.id}
                category={meal.name}  // Usamos 'name' como la categoría
                description={meal.description || ""}  // Proporcionamos un valor por defecto si es undefined
                imageUrl={meal.urlImage} // URL de la imagen
              />
            ))}
          </div>

        </div>
      </section>

      <Footer /> { }
    </div>
  );
};

export default withAuth(MealsCatalogPage);

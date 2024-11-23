'use client';
import React, { useState, useEffect } from "react";
import withAuth from "@/components/withAuth";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ItemCard from "@/components/item-card";

// Definir el tipo para las películas
interface Movie {
  id: number;
  title: string;
  urlImage: string;
  description?: string; // Descripción es opcional
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const MoviesCatalogPage: React.FC = () => {
  // Definir el estado de las películas con el tipo Movie[]
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const url = `${API_URL}/movies`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    };

    // Función para obtener las películas
    const fetchMovies = async () => {
      try {
        const response = await fetch(url, options);
        const result: Movie[] = await response.json();

        // Mapear los resultados a un formato adecuado
        const formattedMovies = result.map((movie) => ({
          id: movie.id,
          title: movie.title,
          urlImage: movie.urlImage,
          description: movie.description || "", // Si no hay descripción, usa un string vacío
        }));


        console.log(formattedMovies);
        setMovies(formattedMovies); // Establecer el estado de las películas
      } catch (error) {
        console.error("Error al obtener las películas:", error);
      }
    };

    fetchMovies();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <div>
      <Navbar />

      {/* Sección de Películas */}
      <section className="py-20 bg-violet-200 h-full min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explora las distintas películas que puedes elegir!
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {movies.map((movie) => (
              <ItemCard
                key={movie.id}
                category={movie.title}
                description={movie.description || ""} // Proporciona un valor por defecto si es undefined
                imageUrl={movie.urlImage}
              />
            ))}

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default withAuth(MoviesCatalogPage);

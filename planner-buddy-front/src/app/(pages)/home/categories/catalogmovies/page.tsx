'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/components/withAuth.js";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ItemCard from "@/components/item-card";

const API_URL = process.env.NEXT_PUBLIC_API_URL;



const MoviesCatalogPage = () => {
  const [movies, setMovies] = useState([]);


  useEffect(() => {
    const url = `${API_URL}/movies`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    };



    const fetchMovies = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();


        const formattedMovies = result.map((movie) => ({
          id: movie.id,
          name: movie.title,
          urlImage: movie.urlImage,
        }));

        console.log(formattedMovies);
        setMovies(formattedMovies);
      } catch (error) {
        console.error("Error al obtener las películas:", error);
      }
    };

    fetchMovies();
  }, []);


  return (
    <div>
      
      <Navbar />

      {/* Features Section */}
      <section className="py-20 bg-violet-200 h-full min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explora las distintas películas que puedes elegir!
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {movies.map((movie) => (
              <ItemCard
                key={movie.id}
                category={movie.name}
                description={movie.description}
                imageUrl={movie.urlImage}
              />
            ))}
          </div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              <ItemCard
                category="Peliculas"
                description="¿Que quisieras ver?"
                imageUrl="https://cdn-icons-png.flaticon.com/512/7295/7295380.png"
              />
              <ItemCard
                category="Comidas"
                description="Mmmmm... ¿Que quiero comer hoy?"
                imageUrl="https://cdn-icons-png.flaticon.com/512/4359/4359642.png"
              />
              <ItemCard
                category="Lugares"
                description="¿Donde vamos?"
                imageUrl="https://cdn-icons-png.flaticon.com/512/11074/11074673.png"
              />
          </div> */}
          
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default withAuth(MoviesCatalogPage);

'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/components/withAuth.js";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ItemCard from "@/components/item-card";

const API_URL = process.env.NEXT_PUBLIC_API_URL;



const PlacesCatalogPage = () => {
  const [places, setPlaces] = useState([]);


  useEffect(() => {
    const url = `${API_URL}/places`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    };



    const fetchPlaces = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();


        const formattedPlaces = result.map((place) => ({
          id: place.id,
          name: place.title,
          urlImage: place.urlImage,
        }));

        console.log(formattedPlaces);
        setPlaces(formattedPlaces);
      } catch (error) {
        console.error("Error al obtener las películas:", error);
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
                category={place.name}
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

'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/components/withAuth.js";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ItemCard from "@/components/item-card";

const API_URL = process.env.NEXT_PUBLIC_API_URL;



const MealsCatalogPage = () => {
  const [meals, setMeals] = useState([]);


  useEffect(() => {
    const url = `${API_URL}/meals`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    };



    const fetchMeals = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();


        const formattedMeals = result.map((meal) => ({
          id: meal.id,
          name: meal.name,
          urlImage: meal.urlImage,
        }));

        console.log(formattedMeals);
        setMeals(formattedMeals);
      } catch (error) {
        console.error("Error al obtener las películas:", error);
      }
    };

    fetchMeals();
  }, []);


  return (
    <div>
      
      <Navbar />

      {/* Features Section */}
      <section className="py-20 bg-violet-200 h-full min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explora las distintas comidas que puedes elegir!
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {meals.map((meal) => (
              <ItemCard
                key={meal.id}
                category={meal.name}
                description={meal.description}
                imageUrl={meal.urlImage}
              />
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default withAuth(MealsCatalogPage);

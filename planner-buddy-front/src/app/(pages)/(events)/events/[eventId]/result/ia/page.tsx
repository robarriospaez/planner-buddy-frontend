"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import withAuth from "@/components/withAuth.js";
import "@/styles/ai-loader.css";


function AIRecommendationsPage({ params }) {
  const { eventId } = params;
  const router = useRouter();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Función para obtener los elementos más likeados
  const getMostLikedItems = async (eventId, category) => {
    try {
      const response = await fetch(`${API_URL}/events/${eventId}/${category}/mostLiked`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`Error al obtener los elementos más likeados: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getMostLikedItems:', error);
      throw error;
    }
  };

  // Función para obtener los elementos dislikeados
  const getDislikedItems = async (eventId, category) => {
    try {
      const response = await fetch(`${API_URL}/events/${eventId}/${category}/disliked`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`Error al obtener los elementos dislikeados: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getDislikedItems:', error);
      throw error;
    }
  };

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const movies = await getMostLikedItems(eventId, 'movies');
        const places = await getMostLikedItems(eventId, 'places');
        const foods = await getMostLikedItems(eventId, 'meals');
        const dislikes = await getDislikedItems(eventId, 'meals');

        const response = await fetch(`/api/ai`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId,
            movies,
            places,
            foods,
            dislikes
          }), // Enviar datos al backend
        });

        if (!response.ok) throw new Error("Failed to get recommendations");
        const data = await response.json();
        console.log(data);
        setRecommendations(data);
      } catch (error) {
        console.error("Error getting recommendations:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      getRecommendations();
    }
  }, [eventId]);

  if (loading) return  <div className="shimmer-text text-center text-violet-900 flex flex-row items-center justify-center">Cargando recomendaciones...
  <div id="preloader6">
    <div>
    <span className="shimmer-text sparkle"></span>
    <span className="shimmer-text sparkle"></span>
    <span className="shimmer-text sparkle"></span>
    <span className="shimmer-text sparkle"></span>
    </div>
  </div>
  </div>

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-violet-900">Recomendaciones basadas en IA</h1>
      {recommendations && (
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(recommendations).map(([category, items]) => (
              <div key={category} className="bg-white rounded-lg shadow p-4">
                <h3 className="text-xl font-semibold mb-2 capitalize">
                  {category}
                </h3>
                <ul className="list-disc pl-5">
                  {items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(AIRecommendationsPage);

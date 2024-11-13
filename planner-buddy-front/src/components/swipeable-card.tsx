"use client";

import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import useUserStore from "@/store/useUserStore.js";
import useCategoryIndexStore from "@/store/useCategoryIndexStore.js";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SwipeableCard = ({ items, category, eventId }) => {
  const { userId } = useUserStore();
  const { setIndex, getIndex } = useCategoryIndexStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false); // Loader state
  const [swipeDirection, setSwipeDirection] = useState(""); // Animation state
  const [swipeOffset, setSwipeOffset] = useState(0);

  useEffect(() => {
    const savedIndex = getIndex(eventId, category);
    setCurrentIndex(savedIndex);
  }, [eventId, category, getIndex]);

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(newIndex);
    setIndex(eventId, category, newIndex);
    setIsProcessing(false);
    setSwipeDirection("");
    setSwipeOffset(0);
  };

  const handleLike = async () => {
    setIsProcessing(true);
    setSwipeDirection("right");

    try {
      const currentItem = items[currentIndex];
      const response = await fetch(
        `${API_URL}/events/${eventId}/${category}/liked`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            eventId,
            itemId: currentItem.id,
            itemName: currentItem.name,
            itemImage: currentItem.urlImage,
            category: category,
          }),
        }
      );

      const data = await response.json();
      console.log(`${category} liked:`, data);
      handleNext();
    } catch (error) {
      console.error(`Error saving ${category} like:`, error);
    }
  };

  const handleDislike = async () => {
    setIsProcessing(true);
    setSwipeDirection("left");

    try {
      const currentItem = items[currentIndex];
      const response = await fetch(
        `${API_URL}/events/${eventId}/${category}/disliked`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            eventId,
            itemId: currentItem.id,
            itemName: currentItem.name,
            itemImage: currentItem.urlImage,
            category: category,
          }),
        }
      );

      const data = await response.json();
      console.log(`${category} disliked:`, data);
      handleNext();
    } catch (error) {
      console.error(`Error saving ${category} dislike:`, error);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleDislike,
    onSwipedRight: handleLike,
    onSwiping: (eventData) => {
      const offset = eventData.deltaX;
      setSwipeOffset(offset);
    },
    onSwiped: () => {
      setSwipeOffset(0);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true, // Ensure touch events are tracked
    delta: 100, // Minimum distance in pixels before a swipe is recognized
    rotationAngle: 0, // Don't rotate the swipe direction
  });

  // Loader styles (red for dislike, green for like)
  const loaderColor = swipeDirection === "left" ? "bg-red-500" : "bg-green-500";

  if (items.length === 0 || !items[currentIndex]) {
    return (
      <div id="loader" className="flex justify-center items-center min-h-full">
        <div className="relative w-16 h-16">
          <div className="w-full h-full border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 m-auto w-12 h-12 border-4 border-purple-300 border-t-transparent rounded-full animate-spin-slow"></div>
          <div className="absolute inset-0 m-auto w-8 h-8 border-4 border-purple-100 border-t-transparent rounded-full animate-spin-reverse"></div>
        </div>
      </div>
    );
  }

  return (
    <section
      className={`flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10`}
    >
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="relative w-24 h-24 rounded-lg flex items-center justify-center">
            <div
              className={`w-full h-full border-4 border-t-transparent rounded-full animate-spin ${loaderColor}`}
            ></div>
            <div
              className={`absolute inset-0 m-auto w-12 h-12 border-4 border-t-transparent rounded-full animate-spin-slow ${
                swipeDirection === "left"
                  ? "border-red-300"
                  : "border-green-300"
              }`}
            ></div>
            <div
              className={`absolute inset-0 m-auto w-8 h-8 border-4  border-t-transparent rounded-full animate-spin-reverse ${
                swipeDirection === "left"
                  ? "border-red-100"
                  : "border-green-100"
              }`}
            ></div>
          </div>
        </div>
      )}

      <button
        onClick={handleDislike}
        className="hidden md:inline-block min-w-15 bg-white text-violet-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
        >
        <img
          src="/utils/corazon-roto.png"
          alt="Corazón roto"
          className="w-8 h-8 m-auto transition-transform duration-300 transform hover:scale-110 hover:rotate-6" // Efectos de transformación
          />
      </button>

      {/* Imagen centrada en todas las pantallas */}
      <div {...handlers} className="relative overflow-hidden">
        <div
          className={`flex flex-col justify-evenly min-w-80 md:min-w-96 h-full min-h-80 items-center bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 ease-out`}
          style={{
            transform: `translateX(${swipeOffset}px) rotate(${
              swipeOffset / 20
            }deg)`,
          }}
        >
          <Image
            className="object-cover"
            src={items[currentIndex].urlImage || "/fallback-image.jpg"}
            alt={items[currentIndex].name || "Imagen no disponible"}
            width={400}
            height={600}
          />
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">
              {items[currentIndex].name || "Título no disponible"}
            </h3>
          </div>
        </div>
        <div
          className={`absolute top-0 left-0 w-full h-full flex items-center justify-start pl-4 text-4xl font-bold text-red-500 transition-opacity duration-300 ${
            swipeOffset < -50 ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src="/utils/corazon-roto.png"
            alt="Corazón roto"
            className="w-8 h-8 m-auto"
          />
        </div>
        <div
          className={`absolute top-0 right-0 w-full h-full flex items-center justify-end pr-4 text-4xl font-bold text-green-500 transition-opacity duration-300 ${
            swipeOffset > 50 ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src="/utils/corazon.png"
            alt="Corazón"
            className="w-8 h-8 m-auto"
          />
        </div>
      </div>

      <button
        onClick={handleLike}
        className="hidden md:inline-block min-w-15 bg-white text-violet-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
        >
        <img
          src="/utils/corazon.png"
          alt="Corazón"
          className="w-8 h-8 m-auto transition-transform duration-300 transform hover:scale-110 hover:rotate-6" // Efectos de transformación
          />
      </button>

      {/* Contenedor de botones */}
      <div className="flex justify-around w-screen md:w-auto md:hidden">
        <button
          onClick={handleDislike}
          className="min-w-15 bg-white text-violet-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
        >
          <img
            src="/utils/corazon-roto.png"
            alt="Corazón roto"
            className="w-8 h-8 m-auto transition-transform duration-300 transform hover:scale-110 hover:rotate-6"
          />
        </button>

        <button
          onClick={handleLike}
          className="min-w-15 bg-white text-violet-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
        >
          <img
            src="/utils/corazon.png"
            alt="Corazón"
            className="w-8 h-8 m-auto transition-transform duration-300 transform hover:scale-110 hover:rotate-6" // Efectos de transformación
            width={150}
            height={150}
          />
        </button>
      </div>
    </section>
  );
};

export default SwipeableCard;

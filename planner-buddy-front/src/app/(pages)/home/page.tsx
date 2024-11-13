'use client'
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import React from "react";
import ItemCard from "@/components/item-card";
import withAuth from "@/components/withAuth.js";

// const items = [
//   {
//     id: 1,
//     category: "Peliculas",
//     description: "¿Que quisieras ver?",
//     imageUrl: "https://cdn-icons-png.flaticon.com/512/7295/7295380.png",
//   },
//   {
//     id: 2,
//     category: "Comidas",
//     description: "Mmmmm... ¿Que quiero comer hoy?",
//     imageUrl: "https://cdn-icons-png.flaticon.com/512/4359/4359642.png",
//   },
//   {
//     id: 3,
//     category: "Lugares",
//     description: "¿Donde vamos?",
//     imageUrl: "https://cdn-icons-png.flaticon.com/512/11074/11074673.png",
//   },
// ];

const HomePage = () => {

  return (
    <div>
      
      <Navbar />
      <section className="min-h-dvh flex flex-col items-center justify-center py-40 bg-gradient-to-b from-violet-500 to-violet-200 text-white md:py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-center">Planner Buddy</h1>
        <p className="text-xl mb-8 md:text-2xl text-#fdf2e9">Tu compa el que planea ;)</p>
      
      </section>

      <section className="py-20 bg-violet-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-#fdf2e9">
            ¡Invitá a tus amigos y empezá a planear!
          </h2>
          <div className=" flex flex-row justify-center items-center gap-8 text-center">
            <a href="/events">
              <ItemCard
                category="Mis Eventos"
                description="¡Invitá a tus amigos y empezá a planear!"
                imageUrl="https://cdn-icons-png.flaticon.com/512/8876/8876545.png"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-violet-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Elegí con tus amigos entre las diferentes categorías...
          </h2>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                category={item.category}
                description={item.description}
                imageUrl={item.imageUrl}
              />
            ))}
          </div> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            <a href="/home/categories/catalogmovies">
              <ItemCard
                category="Peliculas"
                description="¿Que quisieras ver?"
                imageUrl="https://cdn-icons-png.flaticon.com/512/7295/7295380.png"
              />
            </a>
            <a href="/home/categories/catalogmeals">
              <ItemCard
                category="Comidas"
                description="Mmmmm... ¿Que quiero comer hoy?"
                imageUrl="https://cdn-icons-png.flaticon.com/512/4359/4359642.png"
              />
            </a>
            <a href="/home/categories/catalogplaces">
              <ItemCard
                category="Lugares"
                description="¿Donde vamos?"
                imageUrl="https://cdn-icons-png.flaticon.com/512/11074/11074673.png"
              />
            </a>
          </div>
          
          <div></div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default withAuth(HomePage);

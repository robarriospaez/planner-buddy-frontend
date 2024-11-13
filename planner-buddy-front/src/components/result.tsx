import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const LikedItemsChart = ({ eventId, category }) => {
  const router = useRouter();
  const [likedItems, setLikedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/events/${eventId}/${category}/mostLiked`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setLikedItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching liked ${category}:`, error);
        setError(error.message);
        setLoading(false);
      });
  }, [eventId, category]);

  if (loading)
    return (
      <div className="w-full h-96 flex items-center justify-around">
        <div className="relative block w-16 h-16">
          <div className="w-full h-full border-4 border-purple-900 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 m-auto w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin-slow"></div>
          <div className="absolute inset-0 m-auto w-8 h-8 border-4 border-purple-300 border-t-transparent rounded-full animate-spin-reverse"></div>
        </div>
      </div>
    );
  if (error)
    return <div className="grid place-items-center">Error: {error}</div>;

  const categoryTitles = {
    movies: "Películas",
    meals: "Comidas",
    places: "Lugares",
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-2">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-lg text-violet-900">
        {categoryTitles[category]} con más Likes
      </h2>

      {likedItems.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={likedItems}>
              <XAxis
                dataKey="title"
                tickFormatter={(value, index) => {
                  // Encuentra el valor con más likes
                  const maxItem = likedItems.reduce((prev, current) =>
                    prev.likes > current.likes ? prev : current
                  );
                  return value === maxItem.title ? value : "";
                }}
              />
              <Tooltip />
              <Bar dataKey="likes">
                {likedItems.map((entry, index) => {
                  const colors = ["#bf68bf", "#9f369f", "#7f057f"];
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <ul className="mt-6 space-y-4">
            {likedItems.map((item) => (
              <li
                key={item[`${category.slice(0, -1)}Id`]}
                className="bg-gray-50 p-4 border rounded-lg shadow-lg hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between items-center min-h-[350px] md:min-h-[450px] lg:min-h-[475px]"
              >
                <span className="font-semibold text-lg text-gray-700 text-center mb-2">
                  {item.title}
                </span>
                <div className="rounded-lg mb-4 shadow-md">
                  <Image
                    src={item.urlImage}
                    alt={item.title}
                    width={250}
                    height={250}
                    className="rounded-lg"
                  />
                </div>
                <span className="text-sm text-gray-500">
                  Likes: {item.likes}
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-center text-gray-600">
          No hay {categoryTitles[category].toLowerCase()} gustados disponibles
          aún.
        </p>
      )}
    </div>
  );
};

export default LikedItemsChart;

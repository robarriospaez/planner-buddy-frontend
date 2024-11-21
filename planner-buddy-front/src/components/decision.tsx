import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Decision {
  movie: {
    urlImage: string;
    title: string;
  };
  meal: {
    urlImage: string;
    title: string;
  };
  place: {
    urlImage: string;
    title: string;
  };
}

interface HasResults {
  movies: boolean;
  places: boolean;
  meals: boolean;
}

interface DecisionManagerProps {
  eventId: string;
  creator: boolean;
}

const DecisionManager: React.FC<DecisionManagerProps> = ({ eventId, creator }) => {
  const router = useRouter();
  const [decision, setDecision] = useState<Decision | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [noDecision, setNoDecision] = useState<boolean>(false);
  const [hasResults, setHasResults] = useState<HasResults>({ movies: false, places: false, meals: false });

  const getDecision = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    setNoDecision(false);
    try {
      const response = await fetch(`${API_URL}/events/${eventId}/decision`);
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 404) {
          setNoDecision(true);
          setHasResults(data.hasResults || { movies: false, places: false, meals: false });
        } else {
          throw new Error("Failed to fetch decision");
        }
      } else {
        setDecision(data.data);
        setHasResults(data.hasResults || { movies: false, places: false, meals: false });
      }
    } catch (err) {
      console.error("Error fetching decision:", err);
      setError("Failed to fetch decision. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  const createDecision = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/events/${eventId}/decision`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create decision");
      }

      await getDecision();
    } catch (err) {
      console.error("Error creating decision:", err);
      setError("Failed to create decision. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDecision();
  }, [getDecision]);

  const handleIA = (): void => {
    router.push(`/events/${eventId}/result/ia`);
  };

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center align-middle justify-center">
        <div className="relative block w-16 h-16">
          <div className="w-full h-full border-4 border-purple-900 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 m-auto w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin-slow"></div>
          <div className="absolute inset-0 m-auto w-8 h-8 border-4 border-purple-300 border-t-transparent rounded-full animate-spin-reverse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const canCreateDecision = hasResults.movies && hasResults.places && hasResults.meals;

  if (noDecision) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ¡Todavía no tomaron una decisión!
        </h2>
        <p className="text-gray-600 text-center mb-6">
          {canCreateDecision
            ? "Dirígete a resultados si te sientes con ganas de decidir!"
            : "Aún no hay suficientes resultados para tomar una decisión."}
        </p>
        {creator && (
          <button
            id="decision-btn"
            onClick={createDecision}
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
              canCreateDecision
                ? "bg-purple-900 text-white hover:bg-purple-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!canCreateDecision || loading}
          >
            Fijar Decisión
          </button>
        )}
      </div>
    );
  }

  const categoryTitles: { [key: string]: string } = {
    movie: "Película",
    meal: "Comida",
    place: "Lugar",
  };

  return (
    <div className="bg-white rounded-lg py-5 px-2">
      <div className="text-center">
        <h2 className="text-3xl bg-violet-200 rounded-lg shadow-md font-bold mb-4 text-violet-900 inline-block p-4">
          Decisión final:
        </h2>
      </div>
      {decision ? (
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col md:flex-row justify-evenly gap-8">
            {["movie", "meal", "place"].map((category) => (
              <div
                key={category}
                className="border rounded-lg p-6 shadow-lg flex flex-col items-center justify-between transition-transform transform min-h-60"
              >
                <h3 className="text-2xl font-semibold mb-6 capitalize text-violet-900">
                  {categoryTitles[category]}
                </h3>
                <div className="flex-grow flex items-center justify-center mb-6">
                  <Image
                    src={decision[category as keyof Decision].urlImage}
                    alt={decision[category as keyof Decision].title}
                    width={200}
                    height={200}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <p className="text-lg text-gray-700 text-center">
                  {decision[category as keyof Decision].title}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={handleIA}
            className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 mt-5 rounded-full md:text-lg font-semibold"
          >
            Generá tu recomendación con IA 🌟
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-500 mb-4">No decision has been made yet.</p>
          {creator ? (
            <button
              id="decision-btn"
              onClick={createDecision}
              className="bg-violet-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-violet-700 transition-all duration-300"
              disabled={loading}
            >
              Fijar Decisión
            </button>
          ) : (
            <button
              id="decision-btn"
              onClick={createDecision}
              className="bg-gray-300 text-gray-500 px-6 py-3 rounded-full text-lg font-semibold cursor-not-allowed"
              disabled={true}
            >
              Fijar Decisión
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DecisionManager;

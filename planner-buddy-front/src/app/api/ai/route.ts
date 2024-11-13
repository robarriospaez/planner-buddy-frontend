import { NextResponse } from 'next/server';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// Función para manejar el método POST
export async function POST(request) {
  try {
    const { eventId, movies, places, foods, dislikes } = await request.json();

    if (!eventId) {
      return NextResponse.json({ error: 'EventId is required' }, { status: 400 });
    }

    const response = await cohere.chat({
      preamble: "Teniendo en cuenta tus películas, lugares, y comidas favoritas, y evitando los dislikes que has marcado, te voy a recomendar nuevas opciones que coincidan con tus gustos geolocalizadas en Argentina (excepto para películas). La respuesta debe estar en formato JSON, con las keys 'food', 'place', y 'movie'. Cada una de estas keys debe contener un array con las recomendaciones, en caso de que haya opciones disponibles.",
      message: `likes: ${movies.map(movie => movie.title).join(', ')}, places: ${places.map(place => place.title).join(', ')}, foods: ${foods.map(food => food.title).join(', ')}, dislikes: ${dislikes.map(dislike => dislike.title).join(', ')}`,
    });

    const resultJSON = JSON.parse(response.text);
    return NextResponse.json(resultJSON);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Ocurrió un error al generar sugerencias' }, { status: 500 });
  }
}

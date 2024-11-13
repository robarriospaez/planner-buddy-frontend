import { NextResponse } from 'next/server'


export function middleware(request) {
    const eventsCookie = request.cookies.get('eventIds');

    console.log(eventsCookie);
    const eventIdsArray = eventsCookie ? JSON.parse(eventsCookie.value).map(Number) : []; // Convertir la string separada por comas en un array de números

    console.log(eventIdsArray);

    const pathname = request.nextUrl.pathname;
    const eventIdMatch = pathname.match(/^\/events\/([^\/]+)/);
    const eventIdFromUrl = eventIdMatch ? Number(eventIdMatch[1]) : null;

    const isEventFromUser = eventIdsArray?.includes(eventIdFromUrl);
    const isHomePage = pathname.startsWith('/home');
    const isEventsPage = pathname === '/events';

    const redirect = (url) => {
        const destinationURL = new URL(url, request.url);

        if (request.nextUrl.pathname !== destinationURL.pathname) {
            return NextResponse.redirect(destinationURL);
        }

        return null;
    };

    if (!isEventFromUser && !isHomePage && !isEventsPage && eventIdFromUrl) {
        return redirect('/events');
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/events', '/events/:path*'],
};

import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const eventsCookie = request.cookies.get('eventIds');

    console.log(eventsCookie);
    const eventIdsArray: number[] = eventsCookie ? JSON.parse(eventsCookie.value).map(Number) : [];

    console.log(eventIdsArray);

    const pathname = request.nextUrl.pathname;
    const eventIdMatch = pathname.match(/^\/events\/([^\/]+)/);
    const eventIdFromUrl: number | null = eventIdMatch ? Number(eventIdMatch[1]) : null;

    const isEventFromUser = eventIdFromUrl !== null && eventIdsArray.includes(eventIdFromUrl);
    const isHomePage = pathname.startsWith('/home');
    const isEventsPage = pathname === '/events';

    const redirect = (url: string): NextResponse | null => {
        const destinationURL = new URL(url, request.url);

        if (request.nextUrl.pathname !== destinationURL.pathname) {
            return NextResponse.redirect(destinationURL);
        }

        return null;
    };

    if (!isEventFromUser && !isHomePage && !isEventsPage && eventIdFromUrl !== null) {
        return redirect('/events');
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/events', '/events/:path*'],
};

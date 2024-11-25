"use client";

import React from 'react';
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
// import { usePathname } from "next/navigation";

interface Link {
  name: string;
  path: string;
}

interface LayoutProps {
  children: React.ReactNode;
}

const LINKS: Link[] = [
  {
    name: "Configuracion",
    path: "/events/eventId:1",
  },
  {
    name: "Seguridad",
    path: "/events/eventId:2",
  },
  {
    name: "Perfil",
    path: "/events/eventId:3",
  },
];

const EventsLayout: React.FC<LayoutProps> = ({ children }) => {
  // const pathname = usePathname();

  return (
    <>
      <Navbar />
      <div className="h-screen flex bg-gray-100 mx-auto p-4 gap-4">
        <aside className="bg-violet-600 px-20 grid place-items-center rounded-lg relative">
          <span className="absolute top-4 left-4">Layout</span>
          <nav>
            <ul className="flex flex-col gap-10">
              {LINKS.map(({ name, path }) => (
                <li key={path} className="text-3xl">
                  {name}
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default EventsLayout;
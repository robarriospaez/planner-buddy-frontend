import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface CategoryLayoutProps {
  children: React.ReactNode;
}

export default function CategoryLayout({ children }: CategoryLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
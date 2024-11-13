import React from "react";
import Link from "next/link";

export default function HomeLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navigation */}
      <nav className="bg-violet-600 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Planner Buddy
          </Link>
          <div className="space-x-4">
            <Link href="/features" className="hover:underline">
              Features
            </Link>
            <Link href="/pricing" className="hover:underline">
              Pricing
            </Link>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Planner Buddy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

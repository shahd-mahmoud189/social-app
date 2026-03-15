import React from "react";
import { Link } from "react-router-dom"; // Or 'next/link' depending on your framework

export default function NotFound() {
  return (
    <div className="h-svh flex flex-col items-center justify-center p-6 text-center">
      {/* 404 Decorative Element */}
      <div className="relative mb-8">
        <h1 className="text-9xl font-black text-gray-100 select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-blue-500 rounded-2xl rotate-12 flex items-center justify-center shadow-lg shadow-blue-200">
            <i className="fa-solid fa- ghost text-3xl text-white -rotate-12"></i>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-3">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Oops! Page not found
        </h2>
        <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-10">
        <Link
          to="/"
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-blue-200 transition-all active:scale-95 flex items-center gap-3"
        >
          <i className="fa-solid fa-house"></i>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
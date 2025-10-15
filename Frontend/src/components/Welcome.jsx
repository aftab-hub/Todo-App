import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/dashboard"); // Redirect to dashboard
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-indigo-50 px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-indigo-600 mb-6">
        Welcome to Todo App
      </h1>
      <p className="text-gray-700 text-lg sm:text-xl mb-8 text-center">
        Organize your tasks efficiently and stay productive!
      </p>
      <button
        onClick={handleStart}
        className="bg-indigo-600 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
      >
        Get Started
      </button>
    </div>
  );
};

export default Welcome;

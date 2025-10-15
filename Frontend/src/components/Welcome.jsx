import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Welcome = () => {
    const {token} = useContext(AuthContext)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

    if (token) {
         useEffect(() => {
    // Show loading for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading and show welcome content
    }, 2000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

    }

  const handleStart = () => {
    navigate("/dashboard"); // Redirect to dashboard
  };

 if (loading) {
    // Responsive loading screen
    return (
      <div className="min-h-screen flex justify-center items-center bg-indigo-50 px-4">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-4 animate-spin"></div>
          <p className="text-indigo-600 font-semibold text-base sm:text-lg">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Welcome page content
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-indigo-50 px-4 text-center">
      <h1 className="text-3xl sm:text-5xl font-bold text-indigo-600 mb-4 sm:mb-6">
        Welcome to Todo App
      </h1>
      <p className="text-gray-700 text-base sm:text-xl mb-6 sm:mb-8 max-w-md">
        Organize your tasks efficiently and stay productive!
      </p>
      <button
        onClick={handleStart}
        className="bg-indigo-600 cursor-pointer text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base"
      >
        Get Started
      </button>
    </div>
  );
};

export default Welcome;

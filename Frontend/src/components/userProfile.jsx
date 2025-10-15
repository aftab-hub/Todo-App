import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import API from "../services/Api"; // axios instance with token

const ProfileHeader = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileLetter, setProfileLetter] = useState("?"); // default
  const menuRef = useRef();

  // Fetch profile letter on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/user/profile");
      
        setProfileLetter(res?.data?.data?.profileLetter || "?");
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

   const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect to login
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative shadow rounded-xl mb-4 flex items-center justify-end">
      <div className="relative" ref={menuRef}>
        {/* Avatar showing first letter */}
        <div
          onClick={() => setMenuOpen((prev) => !prev)}
          className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center text-lg font-bold cursor-pointer hover:bg-indigo-600 transition"
        >
          {profileLetter}
        </div>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-30 bg-white border border-gray-400  rounded-xl shadow-lg overflow-hidden z-50">
            <button
              onClick={handleLogout}
              className="flex items-center cursor-pointer gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-100 transition"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;

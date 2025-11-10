import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-sky-600">
            Victor Robot Education
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/explore" className="text-gray-700 hover:text-sky-600">
              Explore
            </Link>
            <Link to="/community" className="text-gray-700 hover:text-sky-600">
              Community
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-sky-600">
                  Profile
                </Link>
                {user.is_instructor && (
                  <Link
                    to="/instructor/dashboard"
                    className="text-gray-700 hover:text-sky-600"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-sky-600">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}



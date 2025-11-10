import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 hidden lg:block">
      <nav className="space-y-1">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md text-sm font-medium ${
              isActive
                ? "bg-blue-50 text-blue-700"
                : "text-gray-900 hover:bg-gray-50"
            }`
          }
          end
        >
          Overview
        </NavLink>
        <NavLink
          to="/profile/progress"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md text-sm font-medium ${
              isActive
                ? "bg-blue-50 text-blue-700"
                : "text-gray-900 hover:bg-gray-50"
            }`
          }
        >
          Progress
        </NavLink>
        <NavLink
          to="/profile/goals"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md text-sm font-medium ${
              isActive
                ? "bg-blue-50 text-blue-700"
                : "text-gray-900 hover:bg-gray-50"
            }`
          }
        >
          Goals
        </NavLink>
        <NavLink
          to="/profile/settings"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md text-sm font-medium ${
              isActive
                ? "bg-blue-50 text-blue-700"
                : "text-gray-900 hover:bg-gray-50"
            }`
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
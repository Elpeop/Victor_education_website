import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireInstructor = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requireInstructor && !user.is_instructor) {
    // Avoid redirect loop when already on apply page
    if (location.pathname === "/instructor/apply") {
      return children;
    }
    return <Navigate to="/instructor/apply" replace />;
  }

  return children;
}
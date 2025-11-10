import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ProgressDashboard from "../Components/ProgressDashboard";

export default function Profile() {
  const { user } = useAuth();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    // Mock progress data - replace with API call
    setProgress({
      modules: [
        { 
          id: 1, 
          title: "Introduction to Arduino", 
          progress: 100, 
          completed: true,
          certificateId: "cert1" 
        },
        { 
          id: 2, 
          title: "Sensors & Actuators", 
          progress: 60, 
          completed: false 
        }
      ],
      badges: [
        {
          id: 1,
          name: "Quick Starter",
          description: "Completed first lesson",
          emoji: "🚀"
        },
        {
          id: 2,
          name: "Code Master",
          description: "Wrote 100 lines of code",
          emoji: "💻"
        }
      ]
    });
  }, []);

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="text-gray-600">Welcome back, {user?.username}</p>
        </header>

        <div className="grid gap-6 md:grid-cols-[300px,1fr]">
          <aside className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl">
                  {user?.username?.[0]?.toUpperCase()}
                </div>
              </div>
              <div className="space-y-1">
                <h2 className="font-medium">{user?.username}</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <ProgressDashboard progress={progress} />
          </div>
        </div>
      </div>
    </main>
  );
}
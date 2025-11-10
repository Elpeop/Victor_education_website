import React from "react";
import CommunitySection from "../Components/CommunitySection";

export default function Community() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Community</h1>
        </div>

        <div className="space-y-6">
          <CommunitySection />
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-medium mb-2">Community Feed</h3>
            <p className="text-sm text-gray-500">More feed features (search, tags, pagination) will be added when API is ready.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
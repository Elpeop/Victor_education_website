import React from "react";
import HeroSection from "../Components/HeroSection";
import FeaturedModulesSection from "../Components/FeaturedModulesSection";
import InstructorCTASection from "../Components/InstructorCTASection";
import CommunitySection from "../Components/CommunitySection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection />
      <div className="max-w-6xl mx-auto px-4 -mt-12 space-y-8">
        <FeaturedModulesSection />
        <InstructorCTASection />
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Community Highlights</h2>
          <CommunitySection />
        </section>
      </div>
    </main>
  );
}
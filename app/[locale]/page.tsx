'use client'

import React, { useState, useEffect } from "react";
import HerosSection from "@/components/home/HerosSection";
import MostHeroSection from "@/components/home/MostSearchVehicles";
import WhyToChooseUs from "@/components/home/WhyToChooseUs";
import DealSection from "@/components/home/DealSection";
import CTA from "@/components/home/CTA";
import Feedback from "@/components/home/Feedback";
import { PulseLoader } from "react-spinners";



export default function Home() {
  const [loading, setLoading] = useState(true);

  
  // Simulating loading state for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust this timer as needed
    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <PulseLoader color="#2563eb" size={20} />
      </div>
    );
  }

  return (
    <main className="mx-auto flex flex-col items-start justify-center">
      <HerosSection />
      <MostHeroSection />
      <WhyToChooseUs />
      <DealSection />
      <Feedback />
      <div className="px-2 w-full flex items-center justify-center py-14">
        <CTA />
      </div>
    </main>
  );
}

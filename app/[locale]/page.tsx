
import HerosSection from "@/components/home/HerosSection";
import MostHeroSection from "@/components/home/MostSearchVehicles";
import WhyToChooseUs from "@/components/home/WhyToChooseUs";
import DealSection from "@/components/home/DealSection";
import CTA from "@/components/home/CTA";

export default function Home() {



  return (
    <main className=" mx-auto flex flex-col items-start justify-center">
      <HerosSection/>
      <MostHeroSection />
      <WhyToChooseUs />
      <DealSection />
      <div className="px-2 w-full flex items-center justify-center py-14"> 
        <CTA />
      </div>
    </main>
  );
}
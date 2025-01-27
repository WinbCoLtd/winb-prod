
import HerosSection from "@/components/home/HerosSection";
import MostHeroSection from "@/components/home/MostSearchVehicles";
import WhyToChooseUs from "@/components/home/WhyToChooseUs";
import DealSection from "@/components/home/DealSection";
import CTA from "@/components/home/CTA";
import Feedback from "@/components/customerFeedback/feedback";

export default function Home() {



  return (
    <main className=" mx-auto flex flex-col items-start justify-center">
      <HerosSection/>
      <MostHeroSection />
      <WhyToChooseUs />
      <DealSection />
      <Feedback/>
      <div className="px-2 w-full flex items-center justify-center py-14"> 
        <CTA />
      </div>
    </main>
  );
}
import Image from "next/image";
import Link from "next/link"; 
import HerosSection from "@/components/home/HerosSection";
import MostHeroSection from "@/components/home/MostSearchVehicles";
import WhyToChooseUs from "@/components/home/WhyToChooseUs";

export default function Home() {



  return (
    <main className=" mx-auto flex flex-col items-start justify-center">
      <HerosSection/>
      <MostHeroSection />
      <WhyToChooseUs />

      {/* New Section */}
      <div className="mt-12 bg-[#D9D9D9] px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <Image
              src="/vehicledummy.png"
              alt="New Section Image"
              width={591}
              height={557}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-black">
              Get the Best Deal for Your Vehicle Today
            </h3>
            <p className="mt-4 text-[16px] sm:text-[18px] font-medium text-[#333333]">
              Join thousands of satisfied customers who found their perfect car with us. We offer exclusive benefits and 24/7 support.
            </p>

            <ul className="mt-4 text-[16px] sm:text-[18px] font-medium text-[#333333] list-disc pl-5">
              <li className="mt-2">Largest network of certified cars.</li>
              <li className="mt-2">Round-the-clock customer assistance.</li>
              <li className="mt-2">Unmatched roadside assistance for all our vehicles.</li>
            </ul>
          </div>

        </div>
      </div>

      <div className="mt-12 relative bg-black">
        <Image
          src="/home/vehicle.png"
          alt="Need Assistance"
          width={1153}
          height={473}
          className="w-full h-[473px] object-cover rounded-[10px]"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-4 text-white bg-black bg-opacity-60">
          <h2 className="text-[32px] md:text-[40px] font-bold text-left">
            Need Assistance? We&aposre Here to Help!
          </h2>
          <p className="mt-4 text-[18px] md:text-[24px] font-semibold text-center md:text-justify">
            Have questions about our services or need more information? Our team is here to help. If you&aposd like to learn more about WIN-B or have any specific questions, feel free to contact us. Your satisfaction is our number one priority.
          </p>
          <div className="mt-6 text-center">
            <Link href="/contact">
            <button className="bg-winb-yellow text-black text-[18px] px-8 py-3 rounded-[25px] font-semibold hover:bg-yellow-600 float-right mt-6 mb-4 sm:mb-6 md:mb-8">
        Contact Us
      </button>

            </Link>
          </div>
        </div>
      </div>

      <div className="mb-12 bg-[#D9D9D9] "></div>
    </main>
  );
}
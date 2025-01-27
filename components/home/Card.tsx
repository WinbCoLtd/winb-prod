
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface Ifields {
    id: number;
    title: string;
    description: string;
    price: number;
    model: string;
    vehicleType: string;
    maker: string;
    fuel: string;
    drive: string;
    condition: string;
    color: string;
    grade: string;
    chassieNumber: string;
    Shaken: string;
    manufactureYear: Date;
    mileage: number;
    previewUrl: string;
    isAvailable: boolean;
    isPublished: boolean;
    maxPassengers: number;
  }

export default function Card({vehicle}: {vehicle: Ifields}) {
  return (
    <div
      key={vehicle.id}
      className="relative border border-[#00000032] p-5 rounded-lg shadow-sm max-w-[400px] w-full"
    >
      <Image
        src={vehicle.previewUrl}
        alt={vehicle.title}
        width={342}
        height={255}
        className="w-full h-[255px] object-cover rounded-lg object-center"
      />
      <h4 className="mt-7 text-xl font-semibold">{vehicle.title}</h4>
      <p className="text-[16px] mt-4 text-[#00000056] font-medium">{vehicle.maxPassengers} - {vehicle.fuel} - {vehicle.drive} </p>
      <p className="mt-9 text-3xl font-semibold text-black">
      ¥{vehicle.price}
      </p>
      <button type="button" className="absolute bottom-2 right-2 bg-transparent p-2">
        <Link href={`/searchVehicle/${vehicle.id}`}>
          <ChevronRight size={24} />
        </Link>
      </button>
    </div>
  );
}

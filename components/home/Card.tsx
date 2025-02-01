import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

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

export default function Card({ vehicle }: { vehicle: Ifields }) {
  const locale = useLocale();

  // Helper function to handle fallback logic
  const getLocalizedValue = (value: string, index: number) => {
    const parts = value.split('/');
    return parts[index] && parts[index].length > 0 ? parts[index] : parts[0];
  };

  return (
    <div key={vehicle.id} className="mx-auto md:mx-0 relative border border-[#00000032] p-5 rounded-lg shadow-sm max-w-[400px] w-full">
      <Image
        src={vehicle.previewUrl}
        alt={vehicle.title}
        width={342}
        height={255}
        className="w-full h-[395px] object-cover rounded-lg object-center"
      />

      {/* Title: Split by comma */}
      <h3 className="mt-7 text-xl font-semibold ">
        {locale === 'en'
          ? getLocalizedValue(vehicle.title, 0) // English title (first part before comma)
          : getLocalizedValue(vehicle.title, 1)}  {/* Japanese title (second part) or fallback to English */}
      </h3>

      {/* Description (maxPassengers, fuel, drive): Split by ',' */}
      <p className="text-[16px] mt-4 text-[#00000056] font-medium">
        {locale === 'en'
          ? `${vehicle.maxPassengers} - ${getLocalizedValue(vehicle.fuel, 0)} - ${getLocalizedValue(vehicle.drive, 0)}` // English values (first part)
          : `${vehicle.maxPassengers} - ${getLocalizedValue(vehicle.fuel, 1)} - ${getLocalizedValue(vehicle.drive, 1)}`}  {/* Japanese values (second part) or fallback */}
      </p>

      {/* New description: Split by '/' */}
      <p className="text-[16px] mt-4 text-[#00000056] font-medium">
        {locale === 'en'
          ? vehicle.description.split('/')[0]  // English description (first part before '/')
          : vehicle.description.split('/')[1] || vehicle.description.split('/')[0]}  {/* Japanese description (second part after '/') or fallback */}
      </p>

      {/* Price */}
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

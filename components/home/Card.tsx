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
    const parts = value.split("/");
    return parts[index] && parts[index].length > 0 ? parts[index] : parts[0];
  };

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
      <h4 className="mt-7 text-xl font-semibold">
        {" "}
        {locale === "en"
          ? getLocalizedValue(vehicle.title, 0) // English title (first part before comma)
          : getLocalizedValue(vehicle.title, 1)}
      </h4>
      <p className="text-[16px] mt-4 text-[#00000056] font-medium">
        {" "}
        {locale === "en"
          ? `${vehicle.maxPassengers} - ${getLocalizedValue(
              vehicle.fuel,
              0
            )} - ${getLocalizedValue(vehicle.drive, 0)}` // English values (first part)
          : `${vehicle.maxPassengers} - ${getLocalizedValue(
              vehicle.fuel,
              1
            )} - ${getLocalizedValue(vehicle.drive, 1)}`}
      </p>

      <p>
        {locale === "en"
          ? vehicle.description?.split("/")[0]?.toString().slice(0, 120) // English description (first part before '/')
          : vehicle.description?.split("/")[1]?.toString().slice(0, 120) ||
            vehicle.description?.split("/")[0]?.toString().slice(0, 120)}{" "}
        {/* Japanese description (second part after '/') or fallback */}
      </p>

      <p className="mt-9 text-3xl font-semibold text-black">¥{vehicle.price}</p>
      <button
        type="button"
        className="absolute bottom-2 right-2 bg-transparent p-2"
      >
        <Link href={`/searchVehicle/${vehicle.id}`}>
          <ChevronRight size={24} />
        </Link>
      </button>
    </div>
  );
}

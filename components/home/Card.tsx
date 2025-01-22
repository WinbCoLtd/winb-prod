import Image from "next/image";

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
      className="border p-4 rounded-lg shadow-lg max-w-xs mx-auto"
    >
      <Image
        src={vehicle.previewUrl}
        alt={vehicle.title}
        width={342}
        height={255}
        className="w-full h-[255px] object-cover rounded-md"
      />
      <h4 className="mt-4 text-lg font-semibold">{vehicle.title}</h4>
      <p className="text-sm text-[#6e6d70] font-medium">{vehicle.maxPassengers} {vehicle.fuel} {vehicle.drive} </p>
      <p className="mt-2 text-[20px] sm:text-[24px] md:text-[26px] lg:text-[30px] font-semibold text-black">
        {vehicle.price}
      </p>
    </div>
  );
}

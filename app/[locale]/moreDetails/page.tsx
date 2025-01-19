import React from 'react';

function MoreDetails() {
  return (
    <div className="relative w-full flex flex-col max-w-[1166px] mx-auto">
      <div className="mt-6 h-[127px] bg-gray-200 flex items-center justify-between px-4 md:px-8">
        Nav
      </div>

      <div className="mt-[110px] w-full h-auto bg-winb-ashcolor rounded-[15px] flex flex-col md:flex-row p-[39px]">
        <div className="flex flex-col w-full md:w-[612px]">
          <div className="w-full lg:h-[528px] bg-gray-300 rounded-lg overflow-hidden">
            <img
              src="/cardvehicle.png"
              alt="Large View"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-[51px] grid grid-cols-2 sm:grid-cols-2 xxs:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="w-full lg:h-[110px] bg-gray-300 rounded-lg overflow-hidden">
              <img
                src="/cardvehicle.png"
                alt="Small View 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full lg:h-[110px] bg-gray-300 rounded-lg overflow-hidden">
              <img
                src="/cardvehicle.png"
                alt="Small View 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full lg:h-[110px] bg-gray-300 rounded-lg overflow-hidden">
              <img
                src="/cardvehicle.png"
                alt="Small View 3"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full lg:h-[110px] bg-gray-300 rounded-lg overflow-hidden">
              <img
                src="/cardvehicle.png"
                alt="Small View 4"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-0 md:ml-8 flex flex-col justify-start w-full md:w-[500px]">
          <h2 className="lg:text-[24px] sm:text-[11px] xxs:text[20px] text-black font-bold mb-4">
            Vehicle#1
          </h2>
          <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-black font-medium mb-4">
            This 2018 Toyota Corolla is known for its reliability, fuel economy, and low maintenance costs. With a stylish silver exterior and black interior, it's the perfect choice for your daily commute or family trips.
          </p>
          <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-black font-medium mb-4">
            Key features include an advanced infotainment system, adaptive cruise control, rear parking sensors, and a rearview camera for convenience and safety. The Corolla offers a smooth and comfortable ride in the city and on the highway.
          </p>
          <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-black font-medium">
            With 45,000km on the odometer and the latest safety features, this well-maintained vehicle is waiting for its next owner. Don't miss out — contact us today to schedule a test drive or for more information!
          </p>

          <div className="mt-[46px] grid lg:grid-cols-3 sm:grid-cols-3 xxs:grid-cols-3 md:grid-cols-4 gap-4 items-center">
            <div className="flex items-center">
                <img
                src="/vehicleDetails/fuel-icon.png"
                alt="Fuel Type"
                className="w-4 h-4 mr-2"
                />
                <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-black font-semibold">Fuel Type</p>
            </div>
            <div className="flex items-center">
                <img
                src="/vehicleDetails/drive-icon.png"
                alt="Drive Type"
                className="w-4 h-4 mr-2"
                />
                <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-black font-semibold">Drive Type</p>
            </div>
            <div className="flex items-center">
                <img
                src="/vehicleDetails/condition-icon.png"
                alt="Condition"
                className="w-4 h-4 mr-2"
                />
                <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-black font-semibold">Condition</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 xxs:grid-cols-3 md:grid-cols-4 gap-4 text-center">
            <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-winb-ash font-medium">Petrol</p>
            <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-winb-ash font-medium">Front Wheel</p>
            <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-winb-ash font-medium">Used</p>
          </div>

          <div className="mt-[46px] grid lg:grid-cols-4 sm:grid-cols-4 xxs:grid-cols-4 md:grid-cols-4 gap-4 items-center">
            <div className="flex items-center">
                <img
                src="/vehicleDetails/engine.png"
                alt="Fuel Type"
                className="w-4 h-4 mr-2"
                />
                <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-black font-semibold">Engine</p>
            </div>
            <div className="flex items-center">
                <img
                src="/vehicleDetails/exterior.png"
                alt="Drive Type"
                className="w-4 h-4 mr-2"
                />
                <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-black font-semibold">Exterior Colour</p>
            </div>
            <div className="flex items-center">
                <img
                src="/vehicleDetails/interior.png"
                alt="Condition"
                className="w-4 h-4 mr-2"
                />
                <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-black font-semibold">Interior Colour</p>
            </div>
            
            <div className="flex items-center">
                <img
                src="/vehicleDetails/transmission.png"
                alt="Condition"
                className="w-4 h-4 mr-2"
                />
                <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-black font-semibold">Transmission</p>
            </div>
          </div>

          <div className="mt-4 grid lg:grid-cols-4 sm:grid-cols-4 xxs:grid-cols-4 md:grid-cols-4 gap-4 text-center">
            <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-winb-ash font-medium">1.8L I4</p>
            <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-winb-ash font-medium">Silver</p>
            <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-winb-ash font-medium">Black</p>
            <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-winb-ash font-medium">Automatic</p>
          </div>

          <div className="mt-[55px] flex justify-end">
            <button className="bg-yellow-400 text-sm md:text-base text-black font-medium px-4 py-2 rounded-full hover:bg-yellow-300 transition duration-300">
              Request More Information
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoreDetails;

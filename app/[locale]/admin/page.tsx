'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Admin = () => {
  const [selectedExteriorColor, setSelectedExteriorColor] = useState("");
  const [selectedInteriorColor, setSelectedInteriorColor] = useState("");

  const exteriorColors = ["#000000", "#CCCCCC", "#FFFFFF", "#FF0000", "#0000FF", "#008000", "#800080"];
  const interiorColors = ["#000000", "#3F3F3F", "#A0522D", "#FFD700", "#FFFFFF", "#808080"];

  return (
    <div className="relative w-full flex flex-col max-w-[1166px] mx-auto px-4 py-2">
      <div className="h-[127px] bg-winb-ash text-white mt-[23px] sm:mt-[12px]">
        Navbar
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-6">Add New Vehicle</h2>

      <div className="relative w-full flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-[861px] bg-white shadow-md rounded-lg p-6 border border-winb-text-dark-blue">
          <div className="grid grid-cols-1 sm:grid-cols-2 xs:grid-cols-2 xxs:grid-cols-2 gap-6">
            <div>
              <label className="lg:text-[16px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] text-black font-semibold">Manufacture</label>
              <select className="lg:text-[14px] sm:text-[12px] xs:text-[12px] xxs:text-[12px] w-full mt-5 border border-gray-300 rounded-md p-2 text-winb-ash font-semibold">
                <option value=""></option>
                <option value="toyota">Toyota</option>
                <option value="honda">Honda </option>
                <option value="ford">Ford</option>
              </select>
            </div>
            <div>
              <label className="lg:text-[16px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] text-black font-semibold">Model</label>
              <select className="lg:text-[14px] sm:text-[12px] xs:text-[12px] xxs:text-[12px] w-full mt-5 border border-gray-300 rounded-md p-2 text-winb-ash font-semibold">
                <option value=""></option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="hatchback">Hatchback</option>
                <option value="truck">Truck</option>
              </select>
            </div>
            <div>
              <label className="lg:text-[16px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] text-black font-semibold">Condition</label>
              <select className="lg:text-[14px] sm:text-[12px] xs:text-[12px] xxs:text-[12px] w-full mt-5 border border-gray-300 rounded-md p-2 text-winb-ash font-semibold">
                <option value=""></option>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="certified_preowned">Certified Pre-Owned</option>
              </select>
            </div>
            <div>
              <label className="lg:text-[16px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] text-black font-semibold">Drive Type</label>
              <select className="lg:text-[14px] sm:text-[12px] xs:text-[12px] xxs:text-[12px] w-full mt-5 border border-gray-300 rounded-md p-2 text-winb-ash font-semibold">
                <option value=""></option>
                <option value="fwd">Front-Wheel Drive (FWD)</option>
                <option value="rwd">Rear-Wheel Drive (RWD)</option>
                <option value="awd">All-Wheel Drive (AWD)</option>
                <option value="4wd">Four-Wheel Drive (4WD)</option>
              </select>
            </div>
            <div>
              <label className="lg:text-[16px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] text-black font-semibold">Fuel Type</label>
              <select className="lg:text-[14px] sm:text-[12px] xs:text-[12px] xxs:text-[12px] w-full mt-5 border border-gray-300 rounded-md p-2 text-winb-ash font-semibold">
                <option value=""></option>
                <option value="gasoline">Gasoline</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="lg:text-[16px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] text-black font-semibold">Features</label>
              <input
                type="text"
                placeholder="Enter features"
                className="lg:text-[16px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] w-full mt-5 border border-gray-300 rounded-md p-2 "
              />
            </div>
            <div className="col-span-2">
              <label className="lg:text-[16px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] text-black font-semibold">Description</label>
              <textarea
                rows={4}
                className="lg:text-[16px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] w-full mt-5 border border-gray-300 rounded-md p-2"
                placeholder="Enter description"
              ></textarea>
            </div>
          </div>

          <div className="mt-6 grid lg:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 xxs:grid-cols-1 gap-6">
            <div>
              <h3 className="lg:text-[16px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] text-black font-semibold mb-2">Exterior Colour</h3>
              <div className="flex gap-2">
                {exteriorColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedExteriorColor(color)}
                    style={{ backgroundColor: color }}
                    className={`lg:w-8 lg:h-8 sm:w-6 sm:h-6 xs:w-6 xs:h-6 xxs:w-6 xxs:h-6 rounded-full border-2 ${
                      selectedExteriorColor === color ? "border-blue-500" : "border-gray-300"
                    }`}
                  ></button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="lg:text-[16px] sm:text-[14px] xs:text-[14px] xxs:text-[14px] text-black font-semibold mb-2">Interior Colour</h3>
              <div className="flex gap-2">
                {interiorColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedInteriorColor(color)}
                    style={{ backgroundColor: color }}
                    className={`lg:w-8 lg:h-8 sm:w-6 sm:h-6 xs:w-6 xs:h-6 xxs:w-6 xxs:h-6 rounded-full border-2 ${
                      selectedInteriorColor === color ? "border-blue-500" : "border-gray-300"
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-4">
            <button className="px-6 py-2 rounded-[15px] bg-blue-500 text-white font-semibold">
              Save as draft
            </button>
            <button className="px-6 py-2 text-blue-500 font-bold hover:text-blue-950">
              Publish
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[294px] h-[314px] bg-white shadow-md rounded-lg p-6 border border-winb-text-dark-blue flex flex-col">
          <div className="w-full h-[218px] border-2 border-dashed border-gray-300 p-4 rounded-md text-[13px] text-center text-gray-500 font-semibold flex flex-col justify-center items-center">
            <FontAwesomeIcon icon={faImage} className="mb-2 text-3xl text-gray-500" />
            Drop your image or <span className="text-blue-600">Click to browse</span>
          </div>

          <div className="flex items-start text-sm text-gray-500 mt-2">
            <FontAwesomeIcon icon={faExclamationCircle} className="mr-2 text-2xl text-gray-500" />
            <p className="text-justify text-[12px] text-gray-400 font-semibold">
              You need at least 4 images. Pay attention to the quality of images you add.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

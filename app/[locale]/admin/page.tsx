"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import AdminProfile from "@/components/admin/Profile";
import UserManagement from "@/components/admin/UserManagement";

interface ImageData {
  id: number;
  url: string;
  vehicleId: number;
}

interface Vehicle {
  id: number;
  title: string;
  description: string;
  price: number;
  model: string;
  maker: string;
  vehicleType: string;
  fuel: string;
  drive: string;
  condition: string;
  color: string;
  grade: string;
  chassieNumber: string;
  Shaken: string;
  manufactureYear: string;
  mileage: number;
  isAvailable: boolean;
  isPublished: boolean;
  maxPassengers: number;
  imageCount: number;
  previewUrl: string;
  createdAt: string;
  updatedAt: string;
  images: ImageData[];
}

const Admin = () => {
  const locale = useLocale();
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [screenShot, setScreenShot] = useState<File | null>(null);
  const [retainedUrls, setRetainedUrls] = useState<string[]>([]);
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    id: undefined,
    title: "",
    description: "",
    price: 0,
    model: "",
    maker: "",
    vehicleType: "",
    fuel: "",
    drive: "",
    condition: "",
    color: "",
    grade: "",
    chassieNumber: "",
    Shaken: "",
    manufactureYear: "",
    mileage: 0,
    isAvailable: true,
    isPublished: true,
    maxPassengers: 0,
    imageCount: 0,
    previewUrl: "",
  });
  const [error, setError] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  console.log(role, loading);
  

  useEffect(() => {
    setIsLoading(true);
    setLoading(true);
    fetchVehicles();
    const token = localStorage.getItem("token");
    const roles = localStorage.getItem("role");
    if (!token) {
      router.push("/auth/login");
    } else {
      setToken(token);
      setRole(roles as string);
      setIsLoading(false);
      setLoading(false);
    }
  }, [router]);

  const fetchVehicles = async () => {
    setClicked(true);
    try {
      const response = await axios.get("/api/vehicles/");
      if (response.status === 200) {
        setVehicles(response.data.vehicles);
      } else {
        setError(response.data.error || "Failed to fetch vehicles.");
      }
      setClicked(false);
    } catch (err) {
      setClicked(false);
      console.error("Error fetching vehicles:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const onDrop = (acceptedFiles: File[]) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const handleScreenShotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenShot(e.target.files[0]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleRemoveScreenshot = () => {
    setScreenShot(null);
  };

  const handleRemoveRetainedUrl = (url: string) => {
    setRetainedUrls(retainedUrls.filter((u) => u !== url));
  };

  const handleSubmit = async () => {
    setClicked(true);
    if (!screenShot && !formData.previewUrl) {
      setError("Primary image (screenshot) is required.");
      return;
    }

    const formDataObj = new FormData();
    
    // Append all fields except ID
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "id" && value !== null && value !== undefined) {
        formDataObj.append(key, value.toString());
      }
    });

    if (screenShot) {
      formDataObj.append("screenShot", screenShot);
    }

    files.forEach((file) => formDataObj.append("file", file));
    formDataObj.append("retainedUrls", JSON.stringify(retainedUrls));

    try {
      const endpoint = isEditing
        ? `/api/vehicles/update?id=${formData.id}`
        : "/api/vehicles/add";
      const method = isEditing ? "put" : "post";

      const response = await axios[method](endpoint, formDataObj, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setShowVehicleForm(false);
        setFormData({
          id: undefined,
          title: "",
          description: "",
          price: 0,
          model: "",
          maker: "",
          vehicleType: "",
          fuel: "",
          drive: "",
          condition: "",
          color: "",
          grade: "",
          chassieNumber: "",
          Shaken: "",
          manufactureYear: "",
          mileage: 0,
          isAvailable: true,
          isPublished: true,
          maxPassengers: 0,
          imageCount: 0,
          previewUrl: "",
        });
        setFiles([]);
        setScreenShot(null);
        setRetainedUrls([]);
        setError("");
        fetchVehicles();
      } else {
        setError(response.data.error || "Failed to add/update vehicle.");
      }
      setClicked(false);
    } catch (err) {
      setClicked(false);
      console.error("Error submitting form:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleEdit = async (vehicle: Vehicle) => {
    setClicked(true);
    try {
      const res = await axios.get(`/api/vehicles/readOne?id=${vehicle.id}`);
      if (res.status === 200) {
        const vehicleData = res.data;
        setFormData(vehicleData);
        setScreenShot(null);
        setFiles([]);
        setRetainedUrls(vehicleData.images.map((img: ImageData) => img.url));
        setIsEditing(true);
        setShowVehicleForm(true);
      } else {
        setError("Failed to fetch vehicle data.");
      }
      setClicked(false);
    } catch (err) {
      setClicked(false);
      console.error("Error fetching vehicle data:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    setClicked(true);
    try {
      const response = await axios.delete(`/api/vehicles/delete?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
      } else {
        setError(response.data.error || "Failed to delete vehicle.");
      }
      setClicked(false);
    } catch (err) {
      setClicked(false);
      console.error("Error deleting vehicle:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (isLoading) {
    return <h1>Loading.....</h1>;
  }

  return (
    <div className="px-5 py-5 min-h-screen bg-gray-100">
      <div className=" bg-[#08001C67] w-full flex items-center justify-center border border-[#00CCEE] rounded-[10px] min-h-32 my-auto">
        <Navbar />
      </div>

      <AdminProfile />

      <div className="container mx-auto px-4 pb-10">
        <h1 className="text-2xl font-bold mt-6">
          {locale === "en" ? "Admin Dashboard" : "管理者ダッシュボード"}
        </h1>

        <UserManagement />

        {/* Vehicle Management Section */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => {
              setShowVehicleForm(true);
              setIsEditing(false);
              setFormData({
                id: undefined,
                title: "",
                description: "",
                price: 0,
                model: "",
                maker: "",
                vehicleType: "",
                fuel: "",
                drive: "",
                condition: "",
                color: "",
                grade: "",
                chassieNumber: "",
                Shaken: "",
                manufactureYear: "",
                mileage: 0,
                isAvailable: true,
                isPublished: true,
                maxPassengers: 0,
                imageCount: 0,
                previewUrl: "",
              });
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold w-full sm:w-auto"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            {locale === "en" ? "Add New Vehicle" : "新しい車両を追加"}
          </button>
        </div>

        {/* Vehicle Table */}
        <div className="mt-6 bg-white shadow-md rounded-md p-4 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">
            {locale === "en" ? "Vehicles" : "車両"}
          </h2>
          {vehicles.length === 0 ? (
            <p className="text-center">No vehicles added yet.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border border-gray-300 p-2">
                    {locale === "en" ? "Title" : "タイトル"}
                  </th>
                  <th className="border border-gray-300 p-2">
                    {locale === "en" ? "Price" : "価格"}
                  </th>
                  <th className="border border-gray-300 p-2">
                    {locale === "en" ? "Model" : "モデル"}
                  </th>
                  <th className="border border-gray-300 p-2">
                    {locale === "en" ? "Actions" : "アクション"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">
                      {locale === "en"
                        ? vehicle.title.split("/")[0]
                        : vehicle.title.split("/")[1]}
                    </td>
                    <td className="border border-gray-300 p-2">
                      ${vehicle.price}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {locale === "en"
                        ? vehicle.model.split("/")[0]
                        : vehicle.model.split("/")[1]}
                    </td>
                    <td className="border border-gray-300 p-2 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => {handleEdit(vehicle)
                          formData.id = vehicle.id;
                        }}
                        disabled={clicked}
                        className={`px-3 py-1 bg-yellow-500 text-white rounded-md flex items-center justify-center ${
                          clicked ? "bg-yellow-200" : "rotate-0"
                        }`}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        disabled={clicked}
                        onClick={() => handleDelete(vehicle.id)
                          
                        }
                        className={`px-3 py-1 bg-red-500 text-white rounded-md flex items-center justify-center ${
                          clicked ? "bg-red-300" : "rotate-0"
                        }`}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Add/Edit Vehicle Popup */}
        {showVehicleForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">
                {locale === "en"
                  ? isEditing
                    ? "Edit Vehicle"
                    : "Add New Vehicle"
                  : isEditing
                  ? "車両の編集"
                  : "新しい車両の追加"}
              </h2>
              {error && (
                <p className="text-red-500 mb-4">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="mr-2"
                  />
                  {error}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label
                    className="text-slate-600 font-semibold mb-5"
                    htmlFor="title"
                  >
                    {locale === "en" ? "Title" : "タイトル"}
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>
                {/* test */}
                {
                  isEditing && (
                    <div className="flex flex-col">
                  <label
                    className="text-slate-600 font-semibold mb-5"
                    htmlFor="id"
                  >
                    {locale === "en" ? "id" : "タイトル"}
                  </label>
                  <input
                    name="id"
                    value={formData.id}
                    readOnly
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>
                  )
                }
                <div className="flex flex-col">
                  <label
                    className="text-slate-600 font-semibold mb-5"
                    htmlFor="title"
                  >
                    {locale === "en" ? "Description" : "タイトル"}
                  </label>
                  <input
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-slate-600 font-semibold mb-5"
                    htmlFor="price"
                  >
                    {locale === "en" ? "Price" : "価格"}
                  </label>
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    type="number"
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-slate-600 font-semibold mb-5"
                    htmlFor="model"
                  >
                    {locale === "en" ? "Model" : "モデル"}
                  </label>
                  <input
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-slate-600 font-semibold mb-5"
                    htmlFor="maker"
                  >
                    {locale === "en" ? "Maker" : "作成者"}
                  </label>
                  <input
                    name="maker"
                    value={formData.maker}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-slate-600 font-semibold mb-5"
                    htmlFor="vehicleType"
                  >
                    {locale === "en" ? "Vehicle Type" : "車両タイプ"}
                  </label>
                  <input
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-slate-600 font-semibold mb-5"
                    htmlFor="fuel"
                  >
                    {locale === "en" ? "Fuel Type" : "燃料タイプ"}
                  </label>
                  <input
                    name="fuel"
                    value={formData.fuel}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-slate-600 font-semibold mb-5"
                    htmlFor="drive"
                  >
                    {locale === "en" ? "Drive Type" : "ドライブタイプ"}
                  </label>
                  <input
                    name="drive"
                    value={formData.drive}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-slate-600 font-semibold mb-5"
                    htmlFor="condition"
                  >
                    {locale === "en" ? "Condition" : "状態"}
                  </label>
                  <input
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-slate-600 font-semibold mb-5"
                    htmlFor="color"
                  >
                    {locale === "en" ? "Color" : "色"}
                  </label>
                  <input
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-slate-600 font-semibold mb-5"
                    htmlFor="grade"
                  >
                    {locale === "en" ? "Grade" : "成績"}
                  </label>
                  <input
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-slate-600font-semibold mb-5"
                    htmlFor="chassieNumber"
                  >
                    {locale === "en" ? "Chassie Number" : "シャーシ番号"}
                  </label>
                  <input
                    name="chassieNumber"
                    value={formData.chassieNumber}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-slate-600 font-semibold mb-5"
                    htmlFor="Shaken"
                  >
                    {locale === "en" ? "Shaken" : "シェーケン"}
                  </label>
                  <input
                    name="Shaken"
                    value={formData.Shaken}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-slate-600 font-semibold mb-5"
                    htmlFor="manufactureYear"
                  >
                    {locale === "en" ? "Manufacture Year" : "製造年"}
                  </label>
                  <input
                    name="manufactureYear"
                    value={formData.manufactureYear}
                    onChange={handleInputChange}
                    type="date"
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-slate-600 font-semibold mb-5"
                    htmlFor="mileage"
                  >
                    {locale === "en" ? "Mileage" : "走行距離"}
                  </label>
                  <input
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    type="number"
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-slate-600 font-semibold mb-5"
                    htmlFor="maxPassengers"
                  >
                    {locale === "en" ? "Max Passengers" : "最大乗客数"}
                  </label>
                  <input
                    name="maxPassengers"
                    value={formData.maxPassengers}
                    onChange={handleInputChange}
                    type="number"
                    className="border border-gray-300 p-2 rounded-md w-full"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block font-medium mb-2">
                  {locale === "en"
                    ? "Primary Screenshot:"
                    : "主なスクリーンショット:"}
                </label>
                {formData.previewUrl && !screenShot && (
                  <div className="relative inline-block">
                    <Image
                      width={96}
                      height={96}
                      src={`${formData.previewUrl}`}
                      alt="Screenshot Preview"
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <button
                      onClick={() =>
                        setFormData({ ...formData, previewUrl: "" })
                      }
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {screenShot && (
                  <div className="relative inline-block">
                    <Image
                      width={96}
                      height={96}
                      src={URL.createObjectURL(screenShot)}
                      alt="Screenshot Preview"
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <button
                      onClick={handleRemoveScreenshot}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  onChange={handleScreenShotChange}
                  className="mt-2"
                />
              </div>
              <div className="mt-4">
                <label className="block font-medium mb-2">
                  {locale === "en" ? "Additional Images:" : "追加画像:"}
                </label>
                <div
                  {...getRootProps()}
                  className={`p-10 border-2 border-dashed rounded-md ${
                    isDragActive ? "border-blue-500" : "border-gray-300"
                  }`}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>
                      {locale === "en"
                        ? "Drop the files here..."
                        : "ここにファイルをドロップ..."}
                    </p>
                  ) : (
                    <div className="flex items-center justify-center text-center">
                      <FontAwesomeIcon
                        icon={faExclamationCircle}
                        className="mr-2 text-2xl text-gray-500"
                      />
                      <p className="text-red-600 font-bold">
                        {locale === "en"
                          ? "Drag and drop some files here, or click to select files"
                          : "ここにファイルをドラッグアンドドロップするか、クリックしてファイルを選択してください"}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {retainedUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <Image
                        width={96}
                        height={96}
                        src={`${url}`}
                        alt={`Preview ${index}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <button
                        onClick={() => handleRemoveRetainedUrl(url)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {files.map((file, index) => (
                    <div key={index} className="relative">
                      <Image
                        width={96}
                        height={96}
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {setShowVehicleForm(false) 
                    setRetainedUrls([])
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                >
                  {locale === "en" ? "Cancel" : "キャンセル"}
                </button>
                <button
                  disabled={clicked}
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  {clicked
                    ? locale === "en"
                      ? "Processing..."
                      : "処理中..."
                    : locale === "en"
                    ? isEditing
                      ? "Update"
                      : "Submit"
                    : isEditing
                    ? "更新"
                    : "送信"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;




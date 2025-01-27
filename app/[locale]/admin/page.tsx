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
  faUser,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import axios from "axios";

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

interface Profile {
  id: number;
  nameEn: string;
  nameJa: string;
  username: string;
  stringPassword?: string;
  createdAt: string;
  updatedAt: string;
}

const Admin = () => {
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [profiles, setProfiles] = useState({} as Profile);
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
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [users, setUsers] = useState<Profile[]>([]);
  const [showUserForm, setShowUserForm] = useState(false);

  useEffect(() => {
    fetchVehicles();
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("error token not found");
    } else {
      setToken(token);
      console.log(token);
      fetchProfiles();
      console.log(profiles);
      fetchUsers();
    }
  }, []);

    // Add this new fetch function
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setUsers(response.data.users);
          console.log(response.data.users);
          
        } else {
          setError(response.data.error || "Failed to fetch users.");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("An unexpected error occurred. Please try again.");
      }
    };
  
    // Add these new handler functions
    const handleUserUpdate = async () => {
      try {
        const endpoint = selectedUser?.id 
          ? `/api/users/update?id=${selectedUser.id}`
          : "/api/users/register";
        const method = selectedUser?.id ? "put" : "post";
  
        const response = await axios[method](endpoint, selectedUser, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status == 201) {
          setShowUserForm(false);
          setSelectedUser(null);
          fetchUsers();
          setError("");
        } else {
          setError(response.data.error || "Failed to update user.");
        }
      } catch (err) {
        console.error("Error updating user:", err);
        setError("An unexpected error occurred. Please try again.");
      }
    };
  
    const handleUserDelete = async (id: number) => {
      try {
        const response = await axios.delete(`/api/users/delete?id=${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status == 201) {
          setUsers(users.filter(user => user.id !== id));
        } else {
          setError(response.data.error || "Failed to delete user.");
        }
      } catch (err) {
        console.error("Error deleting user:", err);
        setError("An unexpected error occurred. Please try again.");
      }
    };

  const fetchVehicles = async () => {
    try {
      const response = await axios.get("/api/vehicles/");
      if (response.status === 200) {
        setVehicles(response.data.vehicles);
      } else {
        setError(response.data.error || "Failed to fetch vehicles.");
      }
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const fetchProfiles = async () => {
    try {
      const id = await localStorage.getItem("id");
      const response = await axios.get(`/api/profile?id=${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setProfiles(response.data);
      } else {
        setError(response.data.error || "Failed to fetch profiles.");
      }
    } catch (err) {
      console.error("Error fetching profiles:", err);
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
    if (!screenShot && !formData.previewUrl) {
      setError("Primary image (screenshot) is required.");
      return;
    }

    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
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
        ? `/api/vehicles/update/`
        : "/api/vehicles/add";
      const method = isEditing ? "put" : "post";

      const response = await axios[method](endpoint, formDataObj, {
        headers: {
          authorization: `Bearer ${token}`,
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
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleEdit = async (vehicle: Vehicle) => {
    try {
      const res = await axios.get(`/api/vehicles/readOne?id=${vehicle.id}`);
      if (res.status === 200) {
        const vehicleData = res.data;
        setFormData(vehicleData);
        setScreenShot(null); // Reset screenshot file
        setFiles([]); // Reset new files
        setRetainedUrls(vehicleData.images.map((img: ImageData) => img.url));
        setIsEditing(true);
        setShowVehicleForm(true);
      } else {
        setError("Failed to fetch vehicle data.");
      }
    } catch (err) {
      console.error("Error fetching vehicle data:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`/api/vehicles/delete?id=${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
      } else {
        setError(response.data.error || "Failed to delete vehicle.");
      }
    } catch (err) {
      console.error("Error deleting vehicle:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const response = await axios.put(`/api/auth/authUpdate`, profiles, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setShowProfileForm(false);
        setError("");
        fetchProfiles();
      } else {
        setError(response.data.error || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleProfileDelete = async () => {
    try {
      const response = await axios.delete(`/api/profile/delete`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setProfiles({} as Profile);
        setError("");
        // Redirect or handle the deletion appropriately
      } else {
        setError(response.data.error || "Failed to delete profile.");
      }
    } catch (err) {
      console.error("Error deleting profile:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 pb-10">
        <h1 className="text-2xl font-bold mt-6">Admin Dashboard</h1>

        <div className="mt-6 bg-white shadow-md rounded-md p-4">
            <h2 className="text-xl font-semibold mb-4">
              <FontAwesomeIcon icon={faUsersCog} className="mr-2" /> User Management
            </h2>
            <button
              onClick={() => {
                setSelectedUser(null);
                setShowUserForm(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md mb-4"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add New User
            </button>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Username</th>
                  <th className="border border-gray-300 p-2">Admin</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 && users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{user.nameEn}</td>
                    <td className="border border-gray-300 p-2">{user.username}</td>
                    <td className="border border-gray-300 p-2">
                      {user ? "Yes" : "No"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserForm(true);
                        }}
                        className="px-3 py-1 bg-yellow-400 text-white rounded-md mr-2"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleUserDelete(user.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

                  {/* User Form Popup */}
        {showUserForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">
                {selectedUser ? "Edit User" : "Add New User"}
              </h2>
              {error && (
                <p className="text-red-500 mb-4">
                  <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                  {error}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="nameEn"
                  value={selectedUser?.nameEn || ""}
                  onChange={(e) => setSelectedUser({
                    ...selectedUser || {} as Profile,
                    nameEn: e.target.value
                  })}
                  placeholder="Name (English)"
                  readOnly={selectedUser?.nameEn !== "" && selectedUser?.nameEn !== undefined}
                  className="border border-gray-300 p-2 rounded-md w-full"
                  
                />
                <input
                  name="nameJa"
                  value={selectedUser?.nameJa || ""}
                  onChange={(e) => setSelectedUser({
                    ...selectedUser || {} as Profile,
                    nameJa: e.target.value
                  })}
                  placeholder="Name (Japanese)"
                  readOnly={selectedUser?.nameJa !== "" && selectedUser?.nameJa !== undefined}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <input
                  name="username"
                  value={selectedUser?.username || ""}
                  onChange={(e) => setSelectedUser({
                    ...selectedUser || {} as Profile,
                    username: e.target.value
                  })}
                  placeholder="username"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  type="text"
                />
                {!selectedUser?.id && (
                  <input
                    name="stringPassword"
                    onChange={(e) => setSelectedUser({
                      ...selectedUser || {} as Profile,
                      stringPassword: e.target.value
                    })}
                    placeholder="Password"
                    className="border border-gray-300 p-2 rounded-md w-full"
                    type="password"
                  />
                )}
                <div className="flex items-center gap-2">
                  <input
                    name="isAdmin"
                    type="checkbox"
                    onChange={() => setSelectedUser({
                      ...selectedUser || {} as Profile,
                    })}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  <label>Admin User</label>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    setShowUserForm(false);
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUserUpdate}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  {selectedUser?.id ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Management Section */}
        <div className="mt-6 bg-white shadow-md rounded-md p-4">
          <h2 className="text-xl font-semibold mb-4">
            <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
            Management
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {profiles && (
                <tr key={profiles.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">
                    {profiles.nameEn}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {profiles.username}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => setShowProfileForm(true)}
                      className="px-3 py-1 bg-yellow-400 text-white rounded-md mr-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={handleProfileDelete}
                      className="px-3 py-1 bg-red-500 text-white rounded-md"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Profile Popup */}
        {showProfileForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
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
                <input
                  name="nameEn"
                  value={profiles.nameEn}
                  onChange={(e) =>
                    setProfiles({ ...profiles, nameEn: e.target.value })
                  }
                  placeholder="Name (English)"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <input
                  name="nameJa"
                  value={profiles.nameJa}
                  onChange={(e) =>
                    setProfiles({ ...profiles, nameJa: e.target.value })
                  }
                  placeholder="Name (Japanese)"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <input
                  name="username"
                  value={profiles.username}
                  onChange={(e) =>
                    setProfiles({ ...profiles, username: e.target.value })
                  }
                  placeholder="Username"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowProfileForm(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProfileUpdate}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Vehicle Management Section */}
        <div className="mt-6 flex justify-between items-center">
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
            className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add New Vehicle
          </button>
        </div>

        {/* Vehicle Table */}
        <div className="mt-6 bg-white shadow-md rounded-md p-4">
          <h2 className="text-xl font-semibold mb-4">Vehicles</h2>
          {vehicles.length === 0 ? (
            <p>No vehicles added yet.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border border-gray-300 p-2">Title</th>
                  <th className="border border-gray-300 p-2">Price</th>
                  <th className="border border-gray-300 p-2">Model</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">
                      {vehicle.title}
                    </td>
                    <td className="border border-gray-300 p-2">
                      ${vehicle.price}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {vehicle.model}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => handleEdit(vehicle)}
                        className="px-3 py-1 bg-yellow-400 text-white rounded-md mr-2"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDelete(vehicle.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md"
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
                {isEditing ? "Edit Vehicle" : "Add New Vehicle"}
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
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <input
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  type="number"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <input
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="Model"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <input
                  name="maker"
                  value={formData.maker}
                  onChange={handleInputChange}
                  placeholder="Maker"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <input
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleInputChange}
                  placeholder="Vehicle Type"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <input
                  name="fuel"
                  value={formData.fuel}
                  onChange={handleInputChange}
                  placeholder="Fuel Type"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <input
                  name="drive"
                  value={formData.drive}
                  onChange={handleInputChange}
                  placeholder="Drive Type"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <input
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  placeholder="Condition"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <input
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="Color"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <input
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  placeholder="Grade"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <input
                  name="chassieNumber"
                  value={formData.chassieNumber}
                  onChange={handleInputChange}
                  placeholder="Chassie Number"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <input
                  name="Shaken"
                  value={formData.Shaken}
                  onChange={handleInputChange}
                  placeholder="Shaken"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <input
                  name="manufactureYear"
                  value={formData.manufactureYear}
                  onChange={handleInputChange}
                  placeholder="Manufacture Year"
                  type="date"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <input
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  placeholder="Mileage"
                  type="number"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <input
                  name="maxPassengers"
                  value={formData.maxPassengers}
                  onChange={handleInputChange}
                  placeholder="Max Passengers"
                  type="number"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <div className="flex items-center gap-2">
                  <input
                    name="isAvailable"
                    type="checkbox"
                    checked={formData.isAvailable || false}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  <label>Is Available</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    name="isPublished"
                    type="checkbox"
                    checked={formData.isPublished || false}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  <label>Is Published</label>
                </div>
              </div>
              <div className="mt-4">
                <label className="block font-medium mb-2">
                  Primary Screenshot:
                </label>
                {formData.previewUrl && !screenShot && (
                  <div className="relative inline-block">
                    <img
                      src={`http://localhost:3000${formData.previewUrl}`}
                      alt="Screenshot Preview"
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <button
                      onClick={() => setFormData({ ...formData, previewUrl: "" })}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {screenShot && (
                  <div className="relative inline-block">
                    <img
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
                  Additional Images:
                </label>
                <div
                  {...getRootProps()}
                  className={`p-4 border-2 border-dashed rounded-md ${
                    isDragActive ? "border-blue-500" : "border-gray-300"
                  }`}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here...</p>
                  ) : (
                    <p>
                      Drag &apos;n&apos; drop some files here, or click to
                      select files
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {retainedUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={`http://localhost:3000${url}`}
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
                      <img
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
                  onClick={() => setShowVehicleForm(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  {isEditing ? "Update" : "Submit"}
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
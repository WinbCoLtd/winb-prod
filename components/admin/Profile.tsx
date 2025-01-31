import { faEdit, faSignOutAlt, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Profile {
  id: number;
  nameEn: string;
  nameJa: string;
  username: string;
  stringPassword?: string;
  createdAt: string;
  updatedAt: string;
}

const AdminProfile = () => {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profiles, setProfiles] = useState({} as Profile);
  const [token, setToken] = useState<string>("");
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    } else {
      setToken(token);
      fetchProfiles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProfileUpdate = async () => {
    setClicked(!clicked)
    try {
      const response = await axios.put(`/api/auth/authUpdate`, profiles, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setShowProfileForm(false);
        fetchProfiles();
        setClicked(!clicked)
      } else {
        console.log(response.data.error || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
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
      } else {
        console.log(response.data.error || "Failed to delete profile.");
      }
    } catch (err) {
      console.error("Error deleting profile:", err);
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
        console.log(response.data.error || "Failed to fetch profiles.");
      }
    } catch (err) {
      console.error("Error fetching profiles:", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/auth/login");
  };

  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md sm:w-3/4 md:w-2/3 mx-auto mt-10">
        <h2 className="text-2xl font-semibold flex items-center mb-4">
          <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-700" />
          {locale === "en" ? "Profile Management" : "プロフィール管理"}
        </h2>
        {profiles && (
          <div className="bg-gray-100 p-4 rounded-md shadow-sm">
            <p className="text-lg font-medium text-gray-800">
              {locale === "en" ? profiles.nameEn : profiles.nameJa}
            </p>
            <p className="text-gray-600">
              {locale === "en"
                ? profiles.username
                : `ユーザー名: ${profiles.username}`}
            </p>
            <div className="flex flex-wrap gap-2 justify-between mt-4">
              <button
                onClick={() => setShowProfileForm(true)}
                className="px-3 py-2 bg-yellow-400 text-white rounded-md flex items-center justify-center w-full sm:w-auto"
              >
                <FontAwesomeIcon icon={faEdit} className="mr-1" />
                {locale === "en" ? "Update" : "アップデート"}
              </button>
              <button
                onClick={handleProfileDelete}
                className={`px-3 py-1 bg-red-500 text-white rounded-md flex items-center justify-center`}
              >
                <FontAwesomeIcon icon={faTrash} className="mr-1" />
                {locale === "en" ? "Delete" : "消去"}
              </button>
              <button
                onClick={handleLogout}
                className={`px-3 py-1 bg-blue-500 text-white rounded-md flex items-center justify-center`}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
                {locale === "en" ? "Logout" : "ログアウト"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Popup */}
      {showProfileForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {locale === "en" ? "Edit Profile" : "プロフィールを編集"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="nameEn"
                  className="text-gray-700 font-medium mb-1"
                >
                  {locale === "en" ? "Name (English)" : "名前（英語)"}
                </label>
                <input
                  id="nameEn"
                  name="nameEn"
                  value={profiles.nameEn}
                  onChange={(e) =>
                    setProfiles({ ...profiles, nameEn: e.target.value })
                  }
                  placeholder="Enter your name in English"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="nameJa"
                  className="text-gray-700 font-medium mb-1"
                >
                  {locale === "en" ? "Name (Japanese)" : "名前（日本語)"}
                </label>
                <input
                  id="nameJa"
                  name="nameJa"
                  value={profiles.nameJa}
                  onChange={(e) =>
                    setProfiles({ ...profiles, nameJa: e.target.value })
                  }
                  placeholder="Enter your name in Japanese"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </div>

              <div className="col-span-2 flex flex-col">
                <label
                  htmlFor="username"
                  className="text-gray-700 font-medium mb-1"
                >
                  {locale === "en" ? "Username" : "ユーザー名"}
                </label>
                <input
                  id="username"
                  name="username"
                  value={profiles.username}
                  onChange={(e) =>
                    setProfiles({ ...profiles, username: e.target.value })
                  }
                  placeholder="Enter your username"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowProfileForm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
              >
                {locale === "en" ? "Cancel" : "キャンセル"}
              </button>

              <button
                type="submit"
                onClick={handleProfileUpdate}
                className={`px-4 py-2 bg-blue-500  rounded-md text-white font-semibold  hover:bg-blue-300 transition `}
              >
                {locale === "en"
                  ? clicked
                    ? "Submitting..."
                    : "Update"
                  : locale === "ja"
                  ? clicked
                    ? "送信中..."
                    : "アップデート"
                  : "アップデート"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;

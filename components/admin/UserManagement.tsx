import {
  faEdit,
  faPlus,
  faTrash,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";
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

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [users, setUsers] = useState<Profile[]>([]);
  const [token, setToken] = useState<string>("");
  const [role, setRole] = useState("");
  const [showUserForm, setShowUserForm] = useState(false);
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const roles = localStorage.getItem("role");
    if (!token) {
      router.push("/auth/login");
    } else {
      setToken(token);
      setRole(roles as string);
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    try {
      setClicked(true);
      const response = await axios.get("/api/users", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUsers(response.data.users);
        console.log(response.data.users);
      } else {
        console.log(response.data.error || "Failed to fetch users.");
      }
      setClicked(false);
    } catch (err) {
      setClicked(false);
      console.error("Error fetching users:", err);
    }
  };

  // Add these new handler functions
  const handleUserUpdate = async () => {
    setClicked(true);
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
        setSelectedUser(null);
        fetchUsers();
        setShowUserForm(false);
      } else {
        console.log(response.data.error || "Failed to update user.");
      }
      setClicked(false);
    } catch (err) {
      setClicked(false);
      console.error("Error updating user:", err);
    }
  };

  const handleUserDelete = async (id: number) => {
    setClicked(true);
    try {
      const response = await axios.delete(`/api/users/authRemove?id=${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.status == 201) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        console.log(response.data.error || "Failed to delete user.");
      }
      setClicked(false);
    } catch (err) {
      setClicked(false);
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div>
      {role === "admin" && (
        <div className="mt-6 bg-white shadow-md rounded-md p-4 w-full">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FontAwesomeIcon icon={faUsersCog} className="mr-2" />
            {locale === "en" ? "User Management" : "ユーザー管理"}
          </h2>

          <button
            onClick={() => {
              setSelectedUser(null);
              setShowUserForm(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md mb-4 w-full sm:w-auto"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            {locale === "en" ? "Add New User" : "新規ユーザーを追加"}
          </button>

          {/* Responsive Table Wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border border-gray-300 p-2">
                    {locale === "en" ? "Name" : "名前"}
                  </th>
                  <th className="border border-gray-300 p-2">
                    {locale === "en" ? "Username" : "ユーザー名"}
                  </th>
                  <th className="border border-gray-300 p-2">
                    {locale === "en" ? "Admin" : "管理者"}
                  </th>
                  <th className="border border-gray-300 p-2">
                    {locale === "en" ? "Actions" : "アクション"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 &&
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 p-2">
                        {locale === "en" ? user.nameEn : user.nameJa}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {locale === "en" ? user.username : `${user.username}`}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {user
                          ? locale === "en"
                            ? "Yes"
                            : "はい"
                          : locale === "en"
                          ? "No"
                          : "いいえ"}
                      </td>
                      <td className="border border-gray-300 p-2 flex flex-wrap gap-2">
                        <button
                          disabled={clicked}
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserForm(true);
                            console.log('clicked')
                          }}
                          className={`px-3 py-1 bg-yellow-500 text-white rounded-md flex items-center justify-center ${
                            clicked ? "bg-yellow-200" : "rotate-0"
                          }`}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          disabled={clicked}
                          onClick={() => handleUserDelete(user.id)}
                          className={`px-3 py-1 bg-red-500 text-white rounded-md flex items-center justify-center ${
                            clicked ? "bg-red-300 rotate-90" : "rotate-0"
                          }`}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showUserForm && (
        <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {selectedUser
                ? locale === "en"
                  ? "Edit User"
                  : "ユーザーを編集"
                : locale === "en"
                ? "Add New User"
                : "新しいユーザーを追加"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="nameEn"
                  className="text-gray-700 font-medium mb-1"
                >
                  {locale === "en" ? "Name (English)" : "名前 (英語)"}
                </label>
                <input
                  id="nameEn"
                  name="nameEn"
                  value={selectedUser?.nameEn || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...(selectedUser || ({} as Profile)),
                      nameEn: e.target.value,
                    })
                  }
                  placeholder="Name (English)"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="nameJa"
                  className="text-gray-700 font-medium mb-1"
                >
                  {locale === "en" ? "Name (Japanese)" : "名前 (日本語)"}
                </label>
                <input
                  id="nameJa"
                  name="nameJa"
                  value={selectedUser?.nameJa || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...(selectedUser || ({} as Profile)),
                      nameJa: e.target.value,
                    })
                  }
                  placeholder="Name (Japanese)"
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="username"
                  className="text-gray-700 font-medium mb-1"
                >
                  {locale === "en" ? "Username" : "ユーザー名"}
                </label>
                <input
                  id="username"
                  name="username"
                  value={selectedUser?.username || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...(selectedUser || ({} as Profile)),
                      username: e.target.value,
                    })
                  }
                  placeholder="Username"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  type="text"
                />
              </div>

              {!selectedUser?.id && (
                <div className="flex flex-col">
                  <label
                    htmlFor="stringPassword"
                    className="text-gray-700 font-medium mb-1"
                  >
                    {locale === "en" ? "Password" : "パスワード"}
                  </label>
                  <input
                    id="stringPassword"
                    name="stringPassword"
                    onChange={(e) =>
                      setSelectedUser({
                        ...(selectedUser || ({} as Profile)),
                        stringPassword: e.target.value,
                      })
                    }
                    placeholder="Password"
                    className="border border-gray-300 p-2 rounded-md w-full"
                    type="password"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setShowUserForm(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
              >
                {locale === "en" ? "Cancel" : "キャンセル"}
              </button>
              <button
                disabled={clicked}
                onClick={handleUserUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                {locale === "en"
                  ? selectedUser?.id
                    ? clicked
                      ? "Updating..."
                      : "Update"
                    : clicked
                    ? "Creating..."
                    : "Create"
                  : selectedUser?.id
                  ? clicked
                    ? "更新中..."
                    : "更新"
                  : clicked
                  ? "作成中..."
                  : "作成"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

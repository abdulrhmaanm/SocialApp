import { Card, Avatar } from "flowbite-react";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export function Profile() {
  const { userData, token } = useContext(AuthContext);
  const fileInputRef = useRef(null);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const { data } = await axios.put(
        "https://linked-posts.routemisr.com/users/upload-photo",
        formData,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Photo updated:", data);
      alert("Photo updated successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload photo");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const { data } = await axios.patch(
        "https://linked-posts.routemisr.com/users/change-password",
        {
          password: oldPassword,
          newPassword,
        },
        {
          headers: { token },
        }
      );

      console.log(data);
      alert("Password changed successfully!");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="py-12">
      <Card className="max-w-sm mx-auto">
        <div className="flex flex-col items-center pb-10">
          <Avatar
            alt={userData?.name}
            height="130"
            img={userData?.photo}
            width="130"
            className="mb-3 rounded-full shadow-lg"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {userData?.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userData?.email}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userData?.gender}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userData?.dateOfBirth}
          </span>

          <div className="mt-4 flex space-x-3 lg:mt-6">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <button
              type="button"
              onClick={handleButtonClick}
              className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800"
            >
              Change photo
            </button>

            <button
              type="button"
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
            >
              Change Password
            </button>
          </div>

          {showPasswordForm && (
            <form
              onSubmit={handlePasswordChange}
              className="mt-4 w-full space-y-3"
            >
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full rounded-lg border p-2 text-black dark:text-white"
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg border p-2 text-black dark:text-white"
                required
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border p-2 text-black dark:text-white"
                required
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-cyan-700 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-800"
              >
                Save Password
              </button>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
}

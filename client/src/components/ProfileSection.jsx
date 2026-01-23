import { GrGallery } from "react-icons/gr";
import { useRef, useState } from "react";
import UploadImage from "./UploadImage";
import { updateName, updatePassword } from "../services/auth";
import { useAuth } from "../context/AuthContext";

const ProfileSection = ({
  bannerImage,
  avatar,
  name,
  email,
  createdAt,
  setShowModal,
  logoutUser,
}) => {
  const { updateUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [aspect, setAspect] = useState(null);
  const [actionName, setActionName] = useState(null);

  const domain = (email.match(/@(.+)$/) || [, ""])[1];


  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmitName = async (input) => {
    try {
      const response = await updateName(input);
      updateUser();
      setUsername("");
    } catch (error) {
      console.error("Name update failed:", error.message, error.response);
    }
  };

  const handleSubmitPassword = async (newPassword, confirmPassword) => {
    try {
      const response = await updatePassword(newPassword, confirmPassword);
      updateUser();
      setPassword("");
      setConfirmPassword("");
      setError("");
    } catch (error) {
      console.error("Password update failed:", error.message, error.response);
      setError(error.response.data.error);
    }
  };

  const handleAvatarClick = () => {
    avatarInputRef.current.click();
  };
  const handleBannerClick = () => {
    bannerInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsModalOpen(true);
      setActionName(e.target.name);

      if (e.target.name === "avatar") {
        setAspect(1);
      } else if (e.target.name === "banner") {
        setAspect(19 / 4);
      }
    }
  };

  return (
    <div>
      <div
        onClick={handleBannerClick}
        className="relative group overflow-hidden"
      >
        <img
          className="rounded-t-lg h-[15vh] lg:h-auto object-cover"
          src={bannerImage}
          alt={`${name}-banner`}
        />
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
          <GrGallery size={24} />
        </div>
      </div>
      <div className="w-[90%] mx-auto mt-8 flex flex-col lg:flex-row gap-10 justify-center ">
        <div className="flex gap-4 relative">
          <div
            onClick={handleAvatarClick}
            className="relative group w-14 h-14 md:w-20 md:h-20 lg:w-32 lg:h-32 rounded-lg overflow-hidden"
          >
            <img
              className="object-cover object-center rounded-lg"
              src={avatar}
              alt={`${name}-avatar`}
            />
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <GrGallery size={24} />
            </div>
          </div>
          <div className="">
            <h1 className="lg:text-xl font-bold">{name}</h1>
            {domain !== "anilist.local" && <p className="text-xs md:text-sm lg:text-base">{email}</p>}
            <p className="text-sm text-gray-400">User since {createdAt}</p>
            <button
              className="text-red-500 border-2 border-red-500 px-4 h-10 rounded-lg w-[100px] mt-4"
              onClick={() => {
                logoutUser();
                setShowModal(false);
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="flex gap-8 flex-col md:flex-row px-4 pb-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Change Name</label>
            <input
              id="name"
              className="rounded-md h-10 p-2 text-black"
              placeholder="Enter New Name"
              type="text"
              value={username}
              onChange={handleNameChange}
            />
            <button
              onClick={() => handleSubmitName(username)}
              className="border-2 border-btn_pink rounded-lg text-btn_pink px-4 py-2"
            >
              Change Name
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Change Password</label>
            <input
              id="name"
              className="rounded-md h-10 p-2 text-black"
              placeholder="Enter New Password"
              type="text"
              value={password}
              onChange={handleChangePassword}
            />
            <input
              id="name"
              className="rounded-md h-10 p-2 text-black"
              placeholder="Confirm Password"
              type="text"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
            />
            {error && (
              <p className="text-red-500 text-sm font-bold">{`! ${error}`}</p>
            )}
            <button
              onClick={() => handleSubmitPassword(password, confirmPassword)}
              className="border-2 border-btn_pink rounded-lg text-btn_pink px-4 py-2"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
      <input
        name="avatar"
        type="file"
        accept="image/*"
        ref={avatarInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        name="banner"
        onChange={handleFileChange}
        accept="image/*"
        type="file"
        ref={bannerInputRef}
        className="hidden"
      />
      {isModalOpen && (
        <UploadImage
          file={selectedFile}
          onClose={() => setIsModalOpen(false)}
          aspect={aspect}
          actionName={actionName}
        />
      )}
    </div>
  );
};

export default ProfileSection;

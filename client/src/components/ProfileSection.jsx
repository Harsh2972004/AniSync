import { GrGallery } from "react-icons/gr";
import { useRef, useState } from "react";
import UploadImage from "./UploadImage";

const ProfileSection = ({
  bannerImage,
  avatar,
  name,
  createdAt,
  setShowModal,
  logoutUser,
}) => {
  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [aspect, setAspect] = useState(null);
  const [actionName, setActionName] = useState(null);

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
          className="rounded-t-lg"
          src={bannerImage}
          alt={`${name}-banner`}
        />
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
          <GrGallery size={24} />
        </div>
      </div>
      <div className="w-[90%] mx-auto mt-4 flex gap-10 ">
        <div className="flex gap-4">
          <div
            onClick={handleAvatarClick}
            className="relative group w-32 h-32 rounded-lg overflow-hidden"
          >
            <img
              className="w-32 h-32 object-cover object-center rounded-lg"
              src={avatar}
              alt={`${name}-avatar`}
            />
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <GrGallery size={24} />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold">{name}</h1>
            <p className="text-sm text-gray-400">User since {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Change Name</label>
            <input
              id="name"
              className="rounded-md h-10 p-2"
              placeholder="name"
              type="text"
            />
          </div>

          <button
            className="text-red-500 border-2 border-red-500 px-4 h-10 rounded-lg w-[100px]"
            onClick={() => {
              logoutUser();
              setShowModal(false);
            }}
          >
            Logout
          </button>
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

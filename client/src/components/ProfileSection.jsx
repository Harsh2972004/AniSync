import { GrGallery } from "react-icons/gr";
import { useRef, useState } from "react";
import UploadAvatar from "./UploadAvatar";

const ProfileSection = ({
  bannerImage,
  avatar,
  name,
  setShowModal,
  logoutUser,
}) => {
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsModalOpen(true);
    }
  };

  return (
    <div>
      <img className="rounded-t-lg" src={bannerImage} alt={`${name}-banner`} />
      <div className="w-[90%] mx-auto mt-4 flex gap-2 ">
        <div>
          <div
            onClick={handleClick}
            className="relative group w-32 rounded-lg overflow-hidden"
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
          <h1 className="text-xl font-semibold">{name}</h1>
        </div>
        <button
          className="text-red-500 border-2 border-red-500 px-4 h-10 rounded-lg"
          onClick={() => {
            logoutUser();
            setShowModal(false);
          }}
        >
          Logout
        </button>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      {isModalOpen && (
        <UploadAvatar
          file={selectedFile}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileSection;

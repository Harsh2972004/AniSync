import { useState } from "react";
import { uploadAvatar, uploadBanner } from "../services/auth";
import ImageCropper from "./ImageCropper";
import { useAuth } from "../context/AuthContext";
import { getCroppedImg } from "../utils/getCroppedImg";

const UploadImage = ({ file, onClose, aspect, actionName }) => {
  const { setUser } = useAuth();
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 200, height: 200 });
  const [loading, setLoading] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (pixels) => {
    setCroppedAreaPixels(pixels); // save cropped area for later
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const croppedFile = await getCroppedImg(
        URL.createObjectURL(file),
        croppedAreaPixels
      );

      const formData = new FormData();
      formData.append(
        actionName === "avatar" ? "profileAvatar" : "profileBanner",
        croppedFile,
        actionName === "avatar" ? "avatar.jpg" : "banner.jpg"
      );

      if (actionName === "avatar") {
        const response = await uploadAvatar(formData);
        setUser((prev) => ({ ...prev, avatar: response.data.avatar }));
      } else if (actionName === "banner") {
        const response = await uploadBanner(formData);
        setUser((prev) => ({
          ...prev,
          profileBanner: response.data.profileBanner,
        }));
      }

      onClose();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-primary rounded-xl p-4 w-[90%] max-w-2xl">
        <h2 className="text-lg font-semibold mb-2">{`Crop your ${
          actionName === "avatar" ? "Avatar" : "Banner"
        }`}</h2>

        <ImageCropper
          image={URL.createObjectURL(file)}
          crop={crop}
          setCrop={setCrop}
          onCropComplete={onCropComplete}
          aspect={aspect}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-btn_pink text-white rounded"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;

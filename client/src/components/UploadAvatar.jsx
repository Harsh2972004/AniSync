import { useState } from "react";
import { uploadAvatar } from "../services/auth";
import AvatarCropper from "./AvatarCropper";
import { useAuth } from "../context/AuthContext";
import { getCroppedImg } from "../utils/getCroppedImg";

const UploadAvatar = ({ file, onClose }) => {
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
      formData.append("profileAvatar", croppedFile, "avatar.jpg");

      const response = await uploadAvatar(formData);
      const data = response.data;
      console.log("upload success", data);

      setUser((prev) => ({ ...prev, avatar: response.data.avatar }));

      onClose();
    } catch (error) {
      console.log("upload failed:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-primary rounded-xl p-4 w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-2">Crop your avatar</h2>

        <AvatarCropper
          image={URL.createObjectURL(file)}
          crop={crop}
          setCrop={setCrop}
          onCropComplete={onCropComplete}
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

export default UploadAvatar;

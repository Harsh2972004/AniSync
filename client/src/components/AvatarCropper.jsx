import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

const AvatarCropper = ({ image, onCropComplete, crop, setCrop }) => {
  const [zoom, setZoom] = useState(1);

  const handleCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      onCropComplete(croppedAreaPixels);
    },
    [onCropComplete]
  );

  return (
    <div className="relative w-full h-96 bg-secondary">
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={1}
        cropShape="round"
        showGrid={true}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={handleCropComplete}
        zoomWithScroll={true}
        zoomSpeed={0.1}
      />
    </div>
  );
};

export default AvatarCropper;

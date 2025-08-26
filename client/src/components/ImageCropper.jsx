import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

const ImageCropper = ({ image, onCropComplete, crop, setCrop, aspect }) => {
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
        aspect={aspect} // 19 / 4 || 1
        cropShape={aspect === 1 ? "round" : "rect"}
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

export default ImageCropper;

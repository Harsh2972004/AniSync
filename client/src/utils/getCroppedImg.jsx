export const getCroppedImg = (imgSrc, crop) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imgSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        // Make it behave like a File (so backend knows filename & type)
        const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
        resolve(file);
      }, "image/jpeg");
    };

    image.onerror = (error) => reject(error);
  });
};

import cloudinary from "../config/cloudinary.js";

export const uploadBufferToCloudinary = ({ buffer, folder, publicId }) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                public_id: publicId,
                resource_type: "image",
                overwrite: true,
                transformation: [
                    { width: 800, height: 800, crop: "limit" },
                    { quality: "auto" },
                    { fetch_format: "auto" },
                ],
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        stream.end(buffer);
    });
};

export const deleteFromCloudinary = async (publicId) => {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
};

// Cloudinary Configuration
// Update these values with your Cloudinary credentials

export const CLOUDINARY_CONFIG = {
    cloudName: 'dzz5belph',       // Replace with your Cloudinary cloud name
    uploadPreset: 'ImageUpload', // Replace with your unsigned upload preset
    folder: 'ImageUpload',              // Folder to store uploads
};

/**
 * Upload an image file to Cloudinary
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} - The secure URL of the uploaded image
 */
export async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
    formData.append('folder', CLOUDINARY_CONFIG.folder);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
        {
            method: 'POST',
            body: formData,
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Upload failed');
    }

    const data = await response.json();
    return data.secure_url;
}

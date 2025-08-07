import multer from 'multer'
import cloudinary from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'uploads',
        resource_type: 'auto',
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif','webp','avif', 'pdf', 'epub', 'avi', 'mp3', 'mp4'],
    }
});

export const upload = multer({ storage });

 export default cloudinary
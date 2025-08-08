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

    params: async (req, file) => {
        let resourceType = "auto";
        const mime = file.mimetype;

        if (mime.startsWith("audio/")) resourceType = "video";
        else if (mime.startsWith("video/")) resourceType = "video";
        else if (mime.startsWith("image/")) resourceType = "image";
        else resourceType = "raw";

        return {
            folder:  'uploads',

            allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'avif', 'mp3', 'wav', 'mp4', 'mov', 'avi', 'pdf', 'docx', 'txt'],

            public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,

            resource_type: "auto",
        };
    },
});


export const upload = multer({ storage });

export default cloudinary

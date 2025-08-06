import express from "express";
import { createDocument } from '../controller/documentController.js'
import { upload } from "../config/cloudinary.js"

const router = express.Router();

router.post('/', upload.single('file'), createDocument)

export default router;
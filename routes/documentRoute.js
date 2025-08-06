import express from "express";
import { listDocuments } from "../controller/documentController.js";

const router = express.Router();

// Route pour lister les documents
router.get('/', listDocuments);

export default router;


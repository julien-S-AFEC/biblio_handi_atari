import express from 'express'
import { getDocumentById, listDocuments, putDocument, deleteDocument, createDocument } from '../controller/documentController.js'
import { verifyToken } from '../middlewares/auth.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', listDocuments);
router.get('/getById/:id', getDocumentById);
router.put('/:id', putDocument);
router.delete('/', deleteDocument);
router.post('/', upload.single('file'), createDocument)

export default router;
import express from 'express'
import { getDocumentById, listDocuments, putDocument, deleteDocument, createDocument } from '../controller/documentController.js'
import { verifyToken } from '../middlewares/auth.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', verifyToken, listDocuments);
router.get('/getById/:id', verifyToken, getDocumentById);
router.put('/:id', verifyToken, putDocument);
router.delete('/', verifyToken, deleteDocument);
router.post('/', verifyToken, upload.single('file'), createDocument)

export default router;
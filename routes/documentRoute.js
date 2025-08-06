import express from 'express'
import { getDocumentById, listDocuments, putDocument, deleteDocument } from '../controller/documentController.js'
import { requireAuth } from '../middlewares/auth';

const router = express.Router();

router.get('/', listDocuments);
router.get('/getById/:id', getDocumentById);
router.put('/:id', putDocument);
router.delete('/:id', requireAuth, deleteDocument);
router.post('/', upload.single('file'), createDocument)

export default router;
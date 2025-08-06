import express from 'express'
import { getDocumentById, listDocuments, putDocument } from '../controller/documentController.js'

const router = express.Router();

router.get('/', listDocuments);
router.get('/getById/:id', getDocumentById);
router.put('/:id', putDocument);

export default router;
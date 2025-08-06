import express from 'express'
import { getDocumentById, listDocuments } from '../controller/documentController'

const router = express.Router();

router.get('/', listDocuments);
router.get('/:id', getDocumentById);

export default router;
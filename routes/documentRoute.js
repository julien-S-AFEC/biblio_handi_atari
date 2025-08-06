import express from 'express';
import { deleteDocument } from '../controller/documentController';
import {requireAuth } from '../middlewares/auth';

const router = express.Router();

router.delete('/:id', requireAuth, deleteDocument);

export default router;
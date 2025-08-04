import express from 'express';
import { getByEmail } from '../controller/userController.js';

const router = express.Router();

router.post('/getByEmail', getByEmail);

export default router;
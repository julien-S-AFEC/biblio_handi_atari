import express from 'express';
import { getByEmail, login, changeRole } from '../controller/userController.js';

const router = express.Router();

router.post('/getByEmail', getByEmail);
router.post('/login', login);
router.put('/changeRole', changeRole);
router.post('/logOut', requireAuth, logOut);

export default router;

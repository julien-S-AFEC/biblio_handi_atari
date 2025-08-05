import express from 'express';
import { getByEmail, login, changeRole, logOut } from '../controller/userController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/getByEmail', getByEmail);
router.post('/login', login);
router.put('/changeRole', changeRole);
router.get('/logOut', requireAuth, logOut);

export default router;
import express from "express";
import {register, verifyEmail, getByEmail, login, changeRole, logOut } from "../controller/userController.js";

import { requireAuth, verifyToken } from '../middlewares/auth.js';


const router = express.Router();

router.post("/register", register);
router.get('/verify/:token', verifyToken, verifyEmail);
router.post('/getByEmail', verifyToken, getByEmail);
router.post('/login', login);
router.put('/changeRole', verifyToken, changeRole);
router.get('/logOut', requireAuth, verifyToken, logOut);

export default router;
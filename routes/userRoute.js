import express from "express";
import {register, verifyEmail, getByEmail, login, changeRole, logOut } from "../controller/userController.js";
import sendEmail from "../utils/mailer.js";
import { requireAuth } from '../middlewares/auth.js';


const router = express.Router();

router.post("/register", register);
router.get('/verify/:token', verifyEmail);
router.post('/getByEmail', getByEmail);
router.post('/login', login);
router.put('/changeRole', changeRole);
router.get('/logOut', requireAuth, logOut);

export default router;
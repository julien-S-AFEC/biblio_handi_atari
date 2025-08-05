import express from "express";
import {register, verifyEmail } from "../controller/userController.js";
import sendEmail from "../utils/mailer.js";

const router = express.Router();

router.post("/register", register);
router.get('/verify/:token', verifyEmail);





export default router;
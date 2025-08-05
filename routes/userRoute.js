import express from "express";
import {register, verifyEmail } from "../controller/userController.js";
import sendEmail from "../utils/mailer.js";

const router = express.Router();

router.post("/register", register);
router.get('/verify/:token', sendEmail, verifyEmail);




export default router;
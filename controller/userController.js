import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import  sendEmail  from "../utils/mailer.js";


export const register = async (req, res) => {

  const { name, email, password, confirmPassword, role } = req.body;
  
  const userRole = role || "user";

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Les mots de passe ne correspondent pas." });
  }

  try {
    const existing = await User.findByEmail(email);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Email déjà utilisé." });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed, role: userRole });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });


    const link = `http://localhost:5000/api/user/verify/${token}`;

    await sendEmail({
  to: email,
  subject: 'Vérification de votre compte',
  html: `<p>Bonjour ${name},</p>
         <p>Merci de vous être inscrit. Cliquez sur le lien ci-dessous pour vérifier votre compte :</p>
         <a href="${link}">${link}</a>`
});


    res
      .status(201)
      .json({
        message:
          "Utilisateur créé. Vérifiez vos emails pour activer votre compte.",
      });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur.", error: err.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    
    await User.verifyEmail(email);

    res.status(200).send("Compte vérifié avec succès !");
  } catch (error) {
    res.status(400).send(" Lien invalide ou expiré.");
  }
};





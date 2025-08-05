import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import  sendEmail  from "../utils/mailer.js"
import { User, userLogin, changeUserRole, findUserByEmail } from '../models/userModel.js'


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

    res.status(200).json({ message: "Compte vérifié avec succès !" });
  } catch (error) {
    res.status(400).json({ message: "Lien invalide ou expiré." });
  }
}



export async function getByEmail(req, res) {
    const { email } = req.body;

    if (!email) {
        /* return res.render('getUserEmail', {error: 'Il faut ajouter un email', success: null}); */
        return res.status(400).json({error: 'Il faut ajouter un email'})
    }

    try {
        const existingUser = await findUserByEmail(email);

        if (!existingUser) {
            /* return res.render('getUserEmail', {error: `Cette email n'existe pas`, success: null}); */
            return res.status(404).json({error: `Cette email n'existe pas`})
        }
    
        /* res.session.user = { id: existingUser.id, username: existingUser.username, email: existingUser.user} */
        return res.status(200).json({id: existingUser.id, username: existingUser.username, email: existingUser.email})
        
    } catch (error) {
        /* return res.render('getUserEmail', {error: `Erreur interne du serveur`}); */
        return res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const result = await userLogin(email, password)

        if (result.status === 'failed') {
            res.status(result.statusCode).json(result.message)
        }
        else {
            req.session.user = result.user
            res.status(result.statusCode).json(result.user)
        }
    }
    catch (err) {
        res.status(500).json({ message: `Erreur: ${err.message}` })
    }
}

export const changeRole = async (req, res) => {
    try {
        const { id, newRole } = req.body

        const result = await changeUserRole(id, newRole)

        if (result.status === 'failed') {
            res.status(result.statusCode).json(result.message)
        }
        else {
            if (req.session.user) {
                req.session.user.role = newRole
            }
            res.status(result.statusCode).json(result.message)
        }
    }
    catch (err) {
        res.status(500).json({ message: `Erreur: ${err.message}` })
    }
}

export const logOut = (req, res) => {
    if (!req.session) {
        return res.status(200).json({status: "Accepté"});
    }
    req.session.destroy(err => {
        if (err) {
            console.error("Erreur en détruisant la session", err);
            return res.status(500).json({error: "Connexion impossible"});
        }
        res.clearCookie('connect.sid');
        return res.status(202).json({status: "Accepté"});
    });
}
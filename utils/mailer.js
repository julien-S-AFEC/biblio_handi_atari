import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Test temporaire (à supprimer une fois que ça marche)
console.log(process.env.GMAIL_USER);
console.log(process.env.GMAIL_APP_PASSWORD);


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },      

})

export default async function sendEmail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
     from: `${process.env.GMAIL_NAME} <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email envoyé:", info.messageId);
  } catch (error) {
    console.error("Erreur envoi email:", error);
    throw new Error("Erreur lors de l’envoi de l’email");
  }
}
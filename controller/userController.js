import { findUserByEmail } from '../models/userModel.js'

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
import { userLogin, changeUserRole, findUserByEmail } from '../models/userModel.js'

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

// Adrien

exports.logOut = (req, res) => {
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
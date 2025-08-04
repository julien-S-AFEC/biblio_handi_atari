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
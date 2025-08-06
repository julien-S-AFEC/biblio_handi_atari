import {Document} from '../models/documentModel.js';

export const listDocuments = async (req, res) => {
    try {
        const documents = await Document.findAll();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}
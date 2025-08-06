import { Document } from '../models/documentModel.js';

export async function listDocuments(req, res) {
    try {
        const [documents] = await Document.listDocuments();
        res.status(200).json(documents);
        // res.render(`documents`, {documents});
    } catch (error) {
        console.log(err);
        res.status(500).send(`Erreur de serveur`);
    }
}

export async function getDocumentById(req, res) {
    const { id } = req.params;
    try {
        const [rows] = await Document.findDocumentById(id);
        if (!rows.length) return res.status(404).json({ error: "Catégorie non trouvée" });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);  
        res.status(500).send('Erreur serveur')
    }
}
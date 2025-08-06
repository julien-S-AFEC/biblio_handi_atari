import { Document } from '../models/documentModel.js';
import cloudinary from '../config/cloudinary.js';


export async function listDocuments(req, res) {
    try {
        const documents = await Document.listDocuments();
        
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
        const document = await Document.findDocumentById(id);
        
        if (!document) return res.status(404).json({ error: "Document non trouvée" });
        res.status(200).json(document);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
    }
}

export async function putDocument(req, res) {
    const { id } = req.params;
    const { title, description, format, theme, accessibility, cloudinary_url } = req.body;
    try {
        await Document.editDocument(id, title, description, format, theme, accessibility, cloudinary_url);

        res.status(201).send('Document modifiée avec succès');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
    }
}

export const deleteDocument = async (req, res) => {
    const { id } = req.body;

    try {
        const document = await Document.findDocumentById(id);

        if (!document) {
            return res.status(400).json({ message: "Document non trouvé."});
        }
        const publicId = document.cloudinary_public_id;
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }

        await Document.deleteDocFromDB(id);

        res.status(200).json({ message: "Suppression du document réussie."})
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la suppression du document.",
            error: error.message
        });
    }
};

export const createDocument = async (req, res) => {
    try {
        const { title, description, theme } = req.body

        if (!title || !description || !theme) {
            return res.status(400).json("Les champs titre, description et le thème sont requis.")
        }

        if (!req.file || req.file.length === 0) {
            return res.status(400).json({ message: 'Pas de fichiers a uploader.' });
        }

        await Document.createDocument(title, description, theme, req.file.mimetype, req.file.path, req.file.filename)

        res.status(200).json({
            message: 'Fichier uploadé avec succès.',
            title: title,
            theme: description,
            description: theme,
            path: req.file.path,
            fileName: req.file.filename
        });
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}
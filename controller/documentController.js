import { Document } from '../models/documentModel.js'

export const createDocument = async (req, res) => {
    try {
        const { title, description, theme } = req.body
        
        if (!title || !description || !theme) {
            return res.status(400).json("Les champs titre, description et le thème sont requis.")
        }

        if (!req.file || req.file.length === 0) {
            return res.status(400).json({ message: 'Pas de fichiers a uploader.' });
        }

        await Document.createDocument(title, description, theme, req.file.mimetype, req.file.path)

        res.status(200).json({
            message: 'Files uploaded successfully',
            title: title,
            theme: description,
            description: theme,
            path: req.file.path
        });
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}
import { findDocumentById, deleteDocFromDB } from '../models/documentModel.js';
import cloudinary from '../config/cloudinary.js';

export const deleteDocument = async (req, res) => {
    const { id } = req.params;

    try {
        const document = await findDocumentById(id);

        if (!document) {
            return res.status(400).json({ message: "Document non trouvé"});
        }

        const publicId = document.cloudinary_public_id;
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }

        await deleteDocFromDB(id);

        res.status(200).json({ message: "Suppression du document réussis"})
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la suppression du document",
            error: error.message
        });
    }
};
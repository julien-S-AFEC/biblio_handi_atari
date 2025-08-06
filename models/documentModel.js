import pool from "../config/db.js"

export const Document = {
    createDocument: async (title, description, format, theme, filePath, public_id) => {
        try {
            const result = await pool.execute(`
            INSERT INTO
            documents
            (title, description, format, theme, cloudinary_url, cloudinary_public_id)
            VALUES (?, ?, ?, ?, ?, ?)
            `, [title, description, format, theme, filePath, public_id])
        }
        catch (error) {
            throw error
        }
    }
}
import pool from "../config/db.js"

export const Document = {
    createDocument: async (title, description, format, theme, filePath) => {
        try {
            const result = await pool.execute(`
            INSERT INTO
            documents
            (title, description, format, theme, cloudinary_url)
            VALUES (?, ?, ?, ?, ?)
            `, [title, description, format, theme, filePath])
        }
        catch (error) {
            throw error
        }
    }
}
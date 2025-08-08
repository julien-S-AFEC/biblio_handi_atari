import pool from '../config/db.js';

export const Document = {

    listDocuments: async () => {
        const [rows] = await pool.query(`SELECT * FROM documents;`);
        return rows;
    },

    findDocumentById: async (id) => {
        const [rows] = await pool.query(`SELECT * FROM documents where id = ?`, [id]);
        return rows[0];
    },

    editDocument: async (id, title, description, format, theme, accessibility, cloudinary_url, cloudinary_public_id) => {
        const sql = `UPDATE documents SET title=?, description=?, format=?, theme=?, accessibility=?, cloudinary_url=?, cloudinary_public_id=? WHERE id=?;`;
        await pool.query(sql, [title, description, format, theme, accessibility, cloudinary_url, cloudinary_public_id, id]);
    },

    deleteDocFromDB: async (id) => {
        const [result] = await pool.execute('DELETE FROM documents WHERE id = ?', [id]);
        return result;
    },
    
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
}; 

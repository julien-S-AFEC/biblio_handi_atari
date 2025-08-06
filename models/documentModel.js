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

    editDocument: async (id, title, description, format, theme, accessibility, cloudinary_url) => {
        const sql = `UPDATE documents SET title=?, description=?, format=?, theme=?, accessibility=?, cloudinary_url=? WHERE id=?;`;
        await pool.query(sql, [title, description, format, theme, accessibility, cloudinary_url, id]);
    }
}; 
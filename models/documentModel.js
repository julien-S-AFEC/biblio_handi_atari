import pool from '../config/db.js';

export const Document = {

    listDocuments: async () => {
        const [rows] = await pool.query(`SELECT * FROM documents;`);
        return rows;
    },

    findDocumentById: async (id) => {
        const [rows] = await pool.query(`SELECT * FROM documents where id = ?`, [id]);
        return rows[0];
    }
};
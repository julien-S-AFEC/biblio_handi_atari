import pool from '../config/db';

export const findDocumentById = async (id) => {
    const [rows] = await pool.execute('SELECT * FROM documents WHERE id = ?', [id]);
    return rows[0];
};

export const deleteDocFromDB = async (id) => {
    const [result] = await pool.execute('DELETE * FROM document WHERE id = ?', [id]);
    return result;
};
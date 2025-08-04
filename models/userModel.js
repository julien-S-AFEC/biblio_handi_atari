import pool from '../config/db.js';

// Récupérer les utilisateurs par rapport a leurs email
export async function findUserByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}
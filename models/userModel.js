import pool from '../config/db.js';
import bcrypt from 'bcrypt'

// Récupérer les utilisateurs par rapport a leurs email
export async function findUserByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}

export const userLogin = async (email, password) => {
    try {
        const con = await pool.getConnection()

        const [user, fields] = await con.execute(`
        SELECT id, name, email, password, role  
        FROM users 
        WHERE email=? 
        `, [email])
        if (!user.length) {
            return { status: 'failed', statusCode: 404, message: "L'utilisateur n'existe pas." }
        }
        else {
            const match = await bcrypt.compare(password, user[0].password)

            if (!match) {
                return { status: 'failed', statusCode: 401, message: "Le mot de passe est incorrect" }
            }
            delete user[0].password // Avoid to send the password to the front.
            return { status: 'success', statusCode: 200, user: user[0] }
        }
    }

    catch (error) {
        throw error
    }
}

export const changeUserRole = async (id, newRole) => {
    try {
        const con = await pool.getConnection()
        //Get the available roles
        const [rows, field] = await con.execute(`
        SHOW COLUMNS FROM users LIKE 'role';
        `, [])

        if (!rows[0].Type.includes(newRole)) {
            return  { status: 'failed', statusCode: 400, message: "Le rôle n'est pas autorisé." }
        }

        const [user, fields] = await con.execute(`
        UPDATE
        users
        SET
        role=?
        WHERE
        id=?
        `, [newRole, id])

        if (!user.affectedRows) {
            return { status: 'failed', statusCode: 404, message: "L'utilisateur n'existe pas." }
        }
        else {
            return { status: 'success', statusCode: 200, message: `Le rôle à bien été modifié, nouveau rôle: ${newRole}` }
        }
    }

    catch (error) {
        throw error
    }
}
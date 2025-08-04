import pool from "../config/db.js"
import bcrypt from 'bcrypt'

export const userLogin = async (email, password) => {
    try {
        const con = await pool.getConnection()

        const [user, fields] = await con.execute(`
        SELECT id, name, email, password, role  
        FROM users 
        WHERE email=? 
        `, [email])
        if (!user.length) {
            return { status: 'failed', statusCode: 404, message: "The user doesn't exists." }
        }
        else {
            const match = await bcrypt.compare(password, user[0].password)

            if (!match) {
                return { status: 'failed', statusCode: 401, message: "The password is incorrect" }
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
            return  { status: 'failed', statusCode: 400, message: "The role is not allowed." }
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
            return { status: 'failed', statusCode: 404, message: "The user doesn't exists." }
        }
        else {
            return { status: 'success', statusCode: 200, message: `Role successfully modified to: ${newRole}` }
        }
    }

    catch (error) {
        throw error
    }
}
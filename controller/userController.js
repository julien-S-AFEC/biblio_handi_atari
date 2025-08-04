import { userLogin, changeUserRole } from '../models/userModel.js'

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const result = await userLogin(email, password)

        if (result.status === 'failed') {
            res.status(result.statusCode).json(result.message)
        }
        else {
            req.session.user = result.user
            res.status(result.statusCode).json(result.user)
        }
    }
    catch (err) {
        res.status(500).json({ message: `Error: ${err.message}` })
    }
}

export const changeRole = async (req, res) => {
    try {
        const { id, newRole } = req.body

        const result = await changeUserRole(id, newRole)

        if (result.status === 'failed') {
            res.status(result.statusCode).json(result.message)
        }
        else {
            if (req.session.user) {
                req.session.user.role = newRole
            }
            res.status(result.statusCode).json(result.message)
        }
    }
    catch (err) {
        res.status(500).json({ message: `Error: ${err.message}` })
    }
}

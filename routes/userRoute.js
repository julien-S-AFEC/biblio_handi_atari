import Router from "express";
import { login, changeRole } from '../controller/userController.js'

const userRouter = Router()

userRouter.post('/login', login)
userRouter.put('/changeRole', changeRole)

export default userRouter
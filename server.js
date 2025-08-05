import dotenv from 'dotenv'
import express from 'express'
import userRouter from './routes/userRoute.js'
import expressSession from 'express-session'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json());

app.use(expressSession({
    secret:  process.env.EXPRESS_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}))

app.use('/api/user', userRouter)


app.listen(PORT, () => {
    console.log(`Application lancée sur le port: ${PORT}`)
})

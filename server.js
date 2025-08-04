import express from 'express'
import bodyParser from 'body-parser'
import userRouter from './routes/userRoute.js'
import expressSession from 'express-session'

const PORT = process.env.PORT || 5000

const app = express()

app.use(bodyParser.json({ type: 'application/json' }))
app.use(expressSession({
    secret: 'ma-cle-secrete',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}))

app.use('/api/user', userRouter)


app.listen(PORT, () => {
    console.log(`Application listening on port: ${PORT}`)
})


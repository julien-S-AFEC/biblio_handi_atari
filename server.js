import dotenv from 'dotenv'
import express from 'express'
import userRoutes from './routes/userRoute.js'
import expressSession from 'express-session'
import path from 'path'
import bodyParser from 'body-parser'

const __dirname = path.resolve();

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.set("view engine", "twig") 
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
    secret:  process.env.EXPRESS_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 4000 * 60 * 60
    }
}))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/register', (req, res) => {
    res.render('register')
})
app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

app.use('/api/user', userRoutes)


app.listen(PORT, () => {
    console.log(`Application lancée sur le port: ${PORT}`)
})

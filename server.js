import './config/confingEnv.js'
import express from 'express'
import expressSession from 'express-session'
import path from 'path'
import bodyParser from 'body-parser'
import createMemoryStore from 'memorystore';
import userRoutes from './routes/userRoute.js'
import documentRoutes from './routes/documentRoute.js'

const MemoryStore = createMemoryStore(expressSession);

const __dirname = path.resolve();

const PORT = process.env.PORT || 3000

const app = express(express)

app.set("view engine", "twig")
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
    resave: false,
    store: new MemoryStore({
        checkPeriod: 86400000
    }),
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
app.use('/api/document', documentRoutes)


app.listen(PORT, () => {
    console.log(`Application lancée sur le port: ${PORT}`)
})

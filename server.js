import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import userRoutes from './routes/userRoute.js'
import documentRoutes from './routes/documentRoute.js'
import expressSession from 'express-session'
import path from 'path'
import bodyParser from 'body-parser'
import createMemoryStore from 'memorystore';
import authLimiter from './middlewares/ratelimiter.js'
import helmet from 'helmet';
import cors from './middlewares/cors.js';

const app = express()
const __dirname = path.resolve();

app.use(helmet());
app.use(cors);

app.set("view engine", "twig")
app.set('views', path.join(__dirname, 'views'))

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

app.get('/', (req, res) => {
    res.render('home')
})


app.use(authLimiter);

const MemoryStore = createMemoryStore(expressSession);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Serveur démarré sur http://localhost:${PORT}`);
});



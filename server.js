import dotenv from 'dotenv'
import express from 'express'
import userRoutes from './routes/userRoute.js'
import expressSession from 'express-session'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.set("view engine", "twig") 
app.set("views", "./views") 

app.use(express.json());

app.use(expressSession({
    secret:  process.env.EXPRESS_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 4000 * 60 * 60
    }
}))

app.use('/api/user', userRoutes)

app.get('/', (req, res) => {
    res.render('home')})


app.listen(PORT, () => {
  console.log(` Serveur démarré sur http://localhost:${PORT}`);
});
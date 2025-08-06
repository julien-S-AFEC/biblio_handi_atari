import dotenv from 'dotenv'
import express from 'express'
import userRoutes from './routes/userRoute.js'
import expressSession from 'express-session'
import { authLimiter } from './middlewares/rateLimiter.js';
import helmet from 'helmet';
import cors from './middlewares/cors.js';


dotenv.config();

const app = express()


app.use(helmet());
app.use(cors);

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


app.use( authLimiter); 


const PORT = process.env.PORT || 5000  ;
app.listen(PORT, () => {
  console.log(` Serveur démarré sur http://localhost:${PORT}`);
});



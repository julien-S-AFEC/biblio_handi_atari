import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js';
import { authLimiter } from './middlewares/rateLimiter.js';

dotenv.config();
const app = express();

app.set("view engine", "twig") 

app.use(express.json());

app.use( authLimiter); 
app.use('/api/user', userRoutes);


const PORT = process.env.PORT || 5000  ;
app.listen(PORT, () => {
  console.log(` Serveur démarré sur http://localhost:${PORT}`);
});



import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import userRoutes from './routes/userRoute.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5003;



app.use(express.json());

app.use('/api/user', userRoutes);

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
// Adrien

const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoute');

dotenv.config();

const app = express();

app.use(express.json());

app.use(session({
    secret: process.env.EXPRESS_SESSION_KEY,
    resave: false,
    saveUninitialized: false
}));

app.use('/api/user', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`http://localhost:${port}`));
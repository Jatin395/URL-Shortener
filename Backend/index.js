require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const Database = require('./DB/DB');
const cookie_parser = require('cookie-parser');
const UrlRouter = require('./Router/UrlRouter');
const UserRouter = require('./Router/UserRouter');

app.use(cors({
    origin: process.env.URL || "http://localhost:5173", 
    credentials: true
}));

app.use(cookie_parser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', UserRouter);
app.use('/url', UrlRouter);

Database();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
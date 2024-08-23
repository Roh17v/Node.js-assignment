import mysql from 'mysql2'
import dotenv from 'dotenv'
import express from 'express'
import schoolRouter from './routes/school.js'

const app = express();
dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/schools',schoolRouter)

export const db = mysql.createConnection({
    host: `${process.env.HOST}`,
    user: `${process.env.USER_NAME}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}` 
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to mysql database database');
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Listening on PORT: ${process.env.PORT}...`);
    })
});



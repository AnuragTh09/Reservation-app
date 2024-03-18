import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express();

app.use(express.Router());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))
app.use(express.json({limit: "16kb"}));
app.use(express.cookieParser())

export default app
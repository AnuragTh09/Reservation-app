import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.Router());
app.use(express.urlencoded({extended: true}));
app.use(cors())

export default app
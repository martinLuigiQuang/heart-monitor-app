import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './route.mjs';
import dotenv from 'dotenv';
dotenv.config();

// Initialize express app
const app = express();

// Use local port 5000
const port = process.env.PORT || 5000;

// Bypass cors and parse req and res into json format
app.use(cors());
app.use(express.json());
const uri = process.env.MONGO_CONNECT;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('connected to database');
});

app.use('/', router);
app.listen(port, () => {
    console.log(`listening on port ${port} ...`);
});


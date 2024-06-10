import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import NodeCache from 'node-cache';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
const cache = new NodeCache({ stdTTL: 60 })

app.use(cors());



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
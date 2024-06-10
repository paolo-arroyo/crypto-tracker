import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import NodeCache from 'node-cache';
import axios from 'axios';

dotenv.config();

const PORT = process.env.PORT || 5000;
const TOKENS = ['bitcoin', 'ethereum', 'dogecoin'];

const app = express();
const cache = new NodeCache({ stdTTL: 60 })

app.use(cors());
app.use(express.static(path.join(__dirname, '../../build')));

const fetchTokens = async (coins: string[]) => {
  const cacheKey = 'tokens';
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log('Returning cached data');
    return cachedData;
  }
  try {
    const tokens = await Promise.all(coins.map((coin) => {
      return axios
        .get(`https://api.coingecko.com/api/v3/coins/${coin}`)
        .then((response) => {
          const { id, name, symbol } = response.data;
          return {
            id,
            name,
            symbol
          }
        })
    }));

    cache.set(cacheKey, tokens);

    return tokens;
  } catch (error) {
    console.error("Error fetching tokens:", error);
    throw new Error('Failed to fetch tokens');
  }
}

app.get('/api/tokens', async (req, res) => {
  try {
    const tokens = await fetchTokens(TOKENS);
   res.json(tokens);
  } catch (error) {
    res.location('/error')
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
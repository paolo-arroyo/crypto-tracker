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

const fetchPrices = async (coin: string, minutes: number = 60) => {
  const cacheKey = `prices_${coin}_${minutes}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log('Returning cached price data');
    return cachedData;
  }
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart`, {
      params: {
        vs_currency: 'eur',
        days: Math.ceil(minutes / (24 * 60)) // Convert minutes to days
      }
    });
    const data = response.data.prices;
    
    // Calculate average price within the specified number of minutes
    const now = Date.now();
    const cutoffTime = now - (minutes * 60 * 1000);
    let total = 0;
    let count = 0;
    let history = [];

    for (let i = data.length - 1; i >= 0; i--) {
      const [timestamp, price] = data[i];
      if (timestamp >= cutoffTime) {
        total += price;
        count++;
        history.push({ timestamp, price });
      } else {
        break;
      }
    }

    const latestPrice = data[data.length - 1][1];
    const averagePrice = count > 0 ? total / count : null;

    const priceData = {
      latestPrice,
      averagePrice,
      history,
      count
    };

    cache.set(cacheKey, priceData);

    return priceData;
  } catch (error) {
    console.error('Error fetching prices:', error);
    throw new Error('Failed to fetch prices');
  }
};

app.get('/api/tokens', async (req, res) => {
  try {
    const tokens = await fetchTokens(TOKENS);
   res.json(tokens);
  } catch (error) {
    res.location('/error')
  }
});

app.get('/api/:coin', async (req, res) => {
  try {
    const { coin } = req.params;
    const minutes = parseInt(req.query.minutes as string) || 60;
    const prices = await fetchPrices(coin, minutes);
    res.json(prices);
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
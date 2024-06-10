import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import CoinDetails from '../components/CoinDetails';

const CoinDetailPage: React.FC = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const [searchParams] = useSearchParams();
  const minutes = searchParams.get('minutes');
  const [coinData, setCoinData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(`/api/${coinId}?minutes=${minutes || 60}`);
        setCoinData(response.data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        navigate('/error');
      }
    };

    fetchCoinData();
  }, [coinId, navigate, minutes]);

  if (!coinId) return null;

  return (
    <div>
      <Link to="/" className="text-purple-500 hover:text-black"> ← Back </Link>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="order-2 lg:order-1 w-full min-w-min lg:w-fit">
          {coinData ? <CoinDetails data={coinData} coin={coinId} /> : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default CoinDetailPage;
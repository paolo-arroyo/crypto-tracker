import React from 'react';
import { Link } from 'react-router-dom';

interface TokenCardProps {
  id: string;
  name: string;
  symbol: string;
}

const TokenCard: React.FC<TokenCardProps> = ({ id, name, symbol }) => {
  return (
    <Link to={`/coins/${id}`}>
      <div className="bg-white shadow-md p-4 rounded-lg m-4 hover:text-white hover:shadow-lg hover:bg-purple-500">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-700 font-sm">ID: {id}</p>
        <p className="text-gray-700">Symbol: <span className="uppercase">{symbol}</span></p>
      </div>
    </Link>
  );
};

export default TokenCard;
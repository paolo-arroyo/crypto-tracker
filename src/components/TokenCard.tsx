import React from 'react';
import { Link } from 'react-router-dom';
import { EURO } from '../constants/PriceFormat';

interface TokenCardProps {
  id: string;
  name: string;
  symbol: string;
  price: string;
}

const TokenCard: React.FC<TokenCardProps> = ({ id, name, symbol, price }) => {
  return (
    <Link to={`/coins/${id}`}>
      <div className="bg-white shadow-md p-4 rounded-lg m-4 hover:text-white hover:shadow-lg hover:bg-purple-500">
        <h2 className="text-xl font-semibold flex flex-row justify-between items-center">
          {name}
          <span className="font-normal text-xs text-purple-500">
            {Intl.NumberFormat("en-US", EURO).format(Number(price))}
          </span>
        </h2>
        <p className="text-gray-700 text-sm">ID: {id}</p>
        <p className="text-gray-700 text-sm">Symbol: <span className="uppercase">{symbol}</span></p>
      </div>
    </Link>
  );
};

export default TokenCard;
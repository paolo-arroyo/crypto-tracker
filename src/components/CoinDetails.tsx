import React from 'react';
import { useTokenContext } from '../context/TokenContext';
import { EURO } from '../constants/PriceFormat';

type CoinDetailsProps = {
  coin: string;
  data: {
    latestPrice: string;
    averagePrice: string;
    history: {}[];
    count: string;
  };
}

const CoinDetails: React.FC<CoinDetailsProps> = ({ coin, data }) => {
  const { latestPrice, averagePrice, count } = data;
  const { tokens } = useTokenContext();
  const token = tokens.find((token) => token.id === coin);
  return (
    <div className="mt-4">
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-3xl font-bold font-mono text-underline"> {token?.name} </h1>
        <p className="text-sm rounded-sm bg-purple-500 text-white uppercase px-4"> {token?.symbol} </p>
      </div>
      <p className="text-gray-600 text-sm mb-2"> {count} records shown. </p>
      <p><strong>Latest Price:</strong> {Intl.NumberFormat("en-US", EURO).format(Number(latestPrice))}</p>
      <p className="text-sm text-gray-500">Average: {Intl.NumberFormat("en-US", EURO).format(Number(averagePrice))}</p>
    </div>
  );
};

export default CoinDetails;
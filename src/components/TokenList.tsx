import React from 'react';
import TokenCard from './TokenCard';
import { useTokenContext } from '../context/TokenContext';

const TokenList: React.FC = () => {
  const { tokens } = useTokenContext();

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tokens && tokens.map((token) => (
          <TokenCard key={token.id} {...token} />
        ))}
      </div>
    </div>
  );
};

export default TokenList;
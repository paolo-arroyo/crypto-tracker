import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Token {
  id: string;
  name: string;
  symbol: string;
  price: string;
}

interface TokenContextType {
  tokens: Token[];
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const useTokenContext = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useTokenContext must be used within a TokenProvider');
  }
  return context;
};

interface TokenProviderProps {
  children: ReactNode;
}

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get('/api/tokens');
        setTokens(response.data);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      }
    };

    fetchTokens();

    const intervalId = setInterval(fetchTokens, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <TokenContext.Provider value={{ tokens }}>
      {children}
    </TokenContext.Provider>
  );
};
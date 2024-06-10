import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-purple-500 p-4">
      <div className="w-full max-w-[1080px] mx-auto">
        <h1 className="text-3xl text-white font-bold"><span className="text-4xl font-mono">ASHIK</span> Crypto Price Tracker</h1>
      </div>
    </header>
  );
};

export default Header;
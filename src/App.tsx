import React from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import { TokenProvider } from './context/TokenContext';
import CoinDetailPage from './pages/Coin';
import ErrorPage from './pages/Error';


const App: React.FC = () => {
  return (
    <Router>
      <TokenProvider>
      <Layout>
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:coinId" element={<CoinDetailPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Switch>
      </Layout>
      </TokenProvider>
    </Router>
  );
};

export default App;
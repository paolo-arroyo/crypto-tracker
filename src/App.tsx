import React from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import { TokenProvider } from './context/TokenContext';


const App: React.FC = () => {
  return (
    <Router>
      <TokenProvider>
      <Layout>
        <Switch>
          <Route path="/" element={<Home />} />
        </Switch>
      </Layout>
      </TokenProvider>
    </Router>
  );
};

export default App;
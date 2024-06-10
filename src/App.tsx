import React from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';


const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" element={<Home />} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
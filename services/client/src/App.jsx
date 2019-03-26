import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import './App.css';
import 'normalize.css';
import 'bulma/css/bulma.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" component={Dashboard} />
      </div>
    </Router>
  );
}

export default App;

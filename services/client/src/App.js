import React, { Component } from 'react';
import Dashboard from './components/dashboard'
import Home from './components/home'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard />
        {/* <Home /> */}
      </div>
    );
  }
}

export default App;

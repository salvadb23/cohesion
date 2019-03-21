import React, { Component } from 'react';
import logo from './logo.svg';
import Home from './components/home'
import Dashboard from './components/dashboard'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard />
      </div>
    );
  }
}

export default App;

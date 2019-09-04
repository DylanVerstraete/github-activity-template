import React from 'react';
import './App.css';
import Navigation from './components/Navigation'
import Commits from './components/Commits'

function App() {
  return (
    <div className="App">
      <Navigation />
      <Commits />
    </div>
  );
}

export default App;

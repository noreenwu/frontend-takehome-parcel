import React from 'react';
import './App.css'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="App">
      <div className="header">
          Find and Save RubyGems
      </div>
      <div className="user-inputs">

          <Dashboard/>
      </div>

    </div>
  );
}

export default App;

import React from 'react';
import './App.css'
import SearchInput from './components/SearchInput'

function App() {
  return (
    <div className="App">
      <div className="header">
          Search Ruby Gems
      </div>
      <div className="user-inputs">

          <SearchInput/>
      </div>

    </div>
  );
}

export default App;

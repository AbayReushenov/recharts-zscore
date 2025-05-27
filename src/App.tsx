import React from 'react';
import './App.css';
import BaseChart from './components/BaseChart';
import ZScoreChart from './components/ZScoreChart';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Line Chart</h1>
      <BaseChart />
      <h1>Line Chart with Z-Score</h1>
      <ZScoreChart />
    </div>
  );
}

export default App;

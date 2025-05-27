import React from 'react';
import './App.css';
import ZScoreChart from './components/ZScoreChart';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Анализ данных с Z-Score</h1>
      <ZScoreChart />
    </div>
  );
}

export default App;

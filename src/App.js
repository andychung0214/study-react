import React, { useState } from 'react';
import './App.css';
import Cheer from './Cheer';
import ProgressDIY from './ProgressDIY';

function App(props) {
  const [value, setValue] = useState(0);
  const [score, setScore] = useState(0);

  return (
    <div id="App">
      <ProgressDIY value={value} onClick={(e) => {setValue(e.target.value)}} />
      <Cheer value={score} onClick={(e) => {setScore(e.target.value)}} />
    </div>
  );
}

export default App;

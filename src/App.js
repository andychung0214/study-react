import React, { useState } from 'react';
import './App.css';
import Baby from "./Baby";
import ProgressDIY from './ProgressDIY';

function App(props) {
  const [value, setValue] = useState(0);

  return (
    <div id="App">
      <ProgressDIY value={value} onClick={(e) => {setValue(e.target.value)}} />
    </div>
  );
}

export default App;

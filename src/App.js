import React, { useState } from 'react';
import './App.css';
import Cheer from './Cheer';
import ProgressDIY from './ProgressDIY';
import useRWD from './useRWD';

function App(props) {
  const device = useRWD();
  if(device === "PC")
      return(  <h1 style={{color:"#354458",fontFamily:"Microsoft JhengHei"}}>電腦</h1>  );
    else if(device === "Tablet")
      return(  <h1 style={{color:"#3a9ad9",fontFamily:"Microsoft JhengHei"}}>平板</h1>  );
    else
      return(  <h1 style={{color:"#29aba4",fontFamily:"Microsoft JhengHei"}}>手機</h1>  );
}

export default App;

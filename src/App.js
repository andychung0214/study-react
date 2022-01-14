import React, { useState } from 'react';
import './App.css';
import Baby from "./Baby";

function App(props) {
  const [dad, setDad] = useState("Chang");
  const [born, setBorn] = useState(true);

  const changeDad = () =>{
    if (dad === "Chang") {
      setDad("Wang")
    }else{
      setDad("Chang")
    }
  }

  const spawnBaby = () =>{
    if (born === true) {
      return <Baby dad={dad} />
    }
  }

  return (
    <div>
      {spawnBaby()}
      <div id="talk"></div>
      <button onClick={changeDad}>換爸爸!</button>
      <button onClick={()=>{setBorn(!born)}}>{(born===true)?"讓他回去肚子裡":"讓他生"}</button>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';

function App(props) {
  const [repoName, setRepoName] = useState(null);

  function handleClick(){
    fetch("https://api.github.com/users/andychung0214/repos",{method:"GET"})
    .then(res => res.json())
    .then(data => {
          /*接到request data後要做的事情*/
          console.log("data=", data);
          console.log("data[0]=", data[0]);
          console.log("data[0]['name']=", data[0]['name']);

          const dataRepoName = Array.from({ length: data.length }).map((el, index) => ([{ name: `${data[index]['name']}`, id: `${data[index]['id']}` }]));

          setRepoName(dataRepoName);
    })
    .catch(e => {
        /*發生錯誤時要做的事情*/
        console.log(e);
    })
  };

  return (
    <div className="App">
      <div className="data-display">
        {(repoName === null) ? 
        "目前還有沒有資料" : repoName.map((value) => (
          <h1 key={value[0].id.toString()}>{ value[0].name }</h1>
        )) }
      </div>
      <button onClick={handleClick}>取得jserv以英文字母排序的第一個repo</button>
    </div>
  );
}

export default App;

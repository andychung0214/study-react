import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const testFunction =()=>{
  return (
    <div>
      <button>大家好</button>)
      <h1>test</h1>
    </div>
  );
}

const showOne = true;
const styleArgument = {
  fontSize: '24px',
  color: 'green'
};

const multiButton = () =>{
  var output = [];
  for (let index = 0; index < 4; index++) {
    output.push(<button>我是第{index}按鍵</button>)
    
  }
  return output;
}

ReactDOM.render(
  multiButton(),
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Hello from './HelloWorld';

function formatName(user){
  return user.firstName + '' + user.lastName
}

function getGreeting(user){
  if (user) {
    return <h1>Hello, {formatName(user)}</h1>
  }
  return <h1>Hello, Stranger</h1>
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez',
  avatarUrl: 'https://www.google.com.tw'
};

const element = (
  <h1>
    {getGreeting(user)}
  </h1>
)

const element2 = <div tableIndex="0"></div>;
const element3 = <img src={user.avatarUrl}></img>


ReactDOM.render(
   element,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

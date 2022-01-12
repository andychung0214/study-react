import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelloWorld } from "./HelloWorld";

function formatName(user){
  return user.firstName + '' + user.lastName
}

function formatDate(date){
  return date.toLocaleTimeString();
}

function Comment(props){
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar" src={props.author.avatarUrl} alt={props.author.name}></img>
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-text">
        {formatDate(props.date)}
        </div>

    </div>
  );
}


const comment = {
  date: new Date(),
  text: 'I Wish Travel to Kyoto',
  author:{
    name: 'andy',
    avatarUrl: 'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  },
}

function getGreeting(user){
  if (user) {
    return <h1>Hello, {formatName(user)}</h1>
  }
  return <h1>Hello, Stranger</h1>
}

function tick() {
  const elementDT = (
    <div>
      <h1>Hello, World</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(elementDT, document.getElementById('root'));
}

// setInterval(() => {
//   tick();
// }, 1000);

function Welcome(props){
  return <h1>Hello, {props.name}</h1>
}

const elementWelcome = <Welcome name="Sara" />;

function AppCopy(){
  return(
    <div>
      <Welcome name="Sara" />
      <Welcome name="Bob" />
      <Welcome name="Tom" />
      <Welcome name="Joe" />
    </div>
  );
}


const user = {
  firstName: 'Harper',
  lastName: 'Perez',
  avatarUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
};

const element = (
  <h1>
    {getGreeting(user)}
  </h1>
)

const element2 = <div tableIndex="0">Test Div</div>;
const element3 = <img src={user.avatarUrl}></img>

const title = 'Hello!!!!';

const element4 = (
  <div>
    <h1>{title}</h1>
    <h2>Good to see you here.</h2>
  </div>
)

ReactDOM.render(
  <Comment date={comment.date} text = {comment.text} author={comment.author} />,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

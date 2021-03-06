import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, useRoutes, HashRouter, Switch } from "react-router-dom";

import App from './App';
import HelloWorld from './HelloWorld';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Progress  from './Progress';
import  EffectExample  from './EffectExample';
import  StateExample  from './StateExample';
import { useEffect } from 'react/cjs/react.production.min';
import ProgressDIY from "./ProgressDIY";
import Layout from './Layout';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import GreenProductReport from './GreenProductReport';
// import * as serviceWorker from './serviceWorker';

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

// function Progress(){
//   const barWidth = "50%";
//   return (
//     <div>
//       <div className="progress-back" style={{backgroundColor: "rgba(0,0,0,0.2)", width:"200px", height:"7px",borderRadius:"10px"}}></div>
//       <div className="progress-bar" style={{backgroundColor: "#fe5196", width:barWidth, height:"100%",borderRadius:"10px"}}></div>
//     </div>
//   );
// }

function UserGreeting(){
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(){
  return <h1>Please sign up</h1>
}

function Greeting(props){
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />
  }
  return <GuestGreeting />
}

function LoginButton(props){
  return (
<button onclick={props.onclick}>
  Login
</button>
  );
}

function LogoutButton(props){
  return (
<button onclick={props.onclick}>
  Logout
</button>
  );
}



const printMessage=()=>{
  document.getElementById('show-area').innerHTML = "我被按到了";
}



// const todoItems =  todos.map((todo) =>
//   <li key={todo.id}> 
// {todo.text}
//   </li>
// )

const apiUrl = "https://hn.algolia.com/api/v1/search";

//'https://api.github.com/users/使用者名稱/repos"
const gitApiUrl = "https://api.github.com/users/andychung0214/repos";


// const token = "Bearer " + "我存好的Token";
// const data = { A: "資料A", B: "資料B"};
// const formData = Object.keys(data).map(
//   function(keyName){
//     return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
//   }
// ).join('&');

// fetch(gitApiUrl, {
//   method: "GET",
//   body: formData,
//   headers: new Headers({
//     'Content-Type': 'application/json',
//     'Authorization': token,
//   })
// })
// .then(res => res.json()).then(data => {
  
// })
// .catch(e => {

// })

function FriendStatus(props){
  const [isOnline, setIsOnline] = useState(null);

  // useEffect(() =>{
  //   function handleStatusChange(status){
  //     setIsOnline(status.isOnline);
  //   }
  //   ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

  //   return function cleanup(){
  //     ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  //   }
  // })

  if (isOnline === null) {
    return 'Loading....';
  }
  return isOnline ? 'Online': 'Offline';
}


const ListItem = (props) =>{
  return <li>{props.value}</li>
}

const NumberList = (props) =>{
  const numbers = props.numbers;
  const listItems = numbers.map((number) => <ListItem key={number.toString()} value={number} />);
  return (<ul>{listItems}</ul>);
}

function Blog(props){
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  )
  
  const content = props.posts.map((post) =>
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React !'},
  {id: 2, title: 'Installation', content: 'You can install React from npm !'}
]

const numbers = [1, 2, 3, 4, 5, 6];

ReactDOM.render(
  <GreenProductReport />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
// serviceWorker.unregister();

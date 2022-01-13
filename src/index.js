import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import HelloWorld from './HelloWorld';
import './index.css';
import reportWebVitals from './reportWebVitals';
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

function Progress(){
  const barWidth = "50%";
  return (
    <div>
      <div className="progress-back" style={{backgroundColor: "rgba(0,0,0,0.2)", width:"200px", height:"7px",borderRadius:"10px"}}></div>
      <div className="progress-bar" style={{backgroundColor: "#fe5196", width:barWidth, height:"100%",borderRadius:"10px"}}></div>
    </div>
  );
}

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

ReactDOM.render(
  <React.StrictMode>
  <div>
    <Greeting isLoggedIn={true} />
    {/* {button} */}
  </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
// serviceWorker.unregister();

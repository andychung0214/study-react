import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, useRoutes, } from "react-router-dom";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import greenHotel from "./images/greenHotel.png";
import "./App.css";

const App = () => {

  const ListItem = (props) =>{
    return <li>{props.value}</li>
  }

  const NumberList = (props) =>{
    const numbers = props.numbes;
    const listItems = numbers.map((number) => <ListItem key={number} />);
    return (<ul>{listItems}</ul>);
  }

  console.log(NumberList);
  const numbers = [1, 2, 3, 4, 5, 6];
  ReactDOM.render(<NumberList numbers={numbers}></NumberList> , document.getElementById('root'));
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useRoutes, } from "react-router-dom";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";

const App = () => {
  
  let routes = useRoutes([
    { path: "/first", element: <FirstPage /> },
    { path: "/second", element: <SecondPage /> },
    // ...
  ]);


  return routes;
}

export default App;

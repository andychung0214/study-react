import logo from './logo.svg';
import './App.css';

function App(props) {
  return (
    <button onClick={props.handleClick}>{props.children}</button>
  );
}

export default App;

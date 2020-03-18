import React, { useState, useCallback, memo } from 'react';
import './App.css';


const randomColor = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16);


const Button = memo(props =>
  <button onClick={props.onClick} style={{ background: randomColor() }}>
    {props.children}
  </button>
);


const functions = new Set();

function App() {

  const [delta, setDelta] = useState(1);
  const [c, setC] = useState(0);

  const incrementDelta = () => setDelta(delta => delta + 1);
  const increment = () => setC(c => c + delta);


  functions.add(incrementDelta);
  functions.add(increment);

  return (
    <div>
      <div>Delta is {delta}</div>
      <div>Counter is {c} </div>
      <br />
      <div>
        <Button onClick={incrementDelta}>Increment Delta</Button>
        <Button onClick={increment}>increment Counter</Button>
      </div>
      <br />
      <div>Newly Created Functions: {functions.size - 2}</div>
    </div>
  );
}


export default App;

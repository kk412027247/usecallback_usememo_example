import React, {useState} from 'react';
import Button from './Button'

const functions = new Set();

function App() {

  const [delta, setDelta] = useState(1);
  const [c, setC] = useState(0);

  const incrementDelta = () => setDelta(delta => delta + 1);
  const increment = () => setC(c => c + delta);

  functions.add(incrementDelta);
  functions.add(increment);

  return (
    <div className='app'>
      <h3>原始的模样</h3>
      <br/>
      <div>Delta is {delta}</div>
      <div>Counter is {c} </div>
      <br/>
      <div>
        <Button onClick={incrementDelta}>Increment Delta</Button>
        <Button onClick={increment}>increment Counter</Button>
      </div>
      <br/>
      <div>Newly Created Functions: {functions.size - 2}</div>
    </div>
  );
}

export default App;

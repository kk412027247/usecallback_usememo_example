import React, {useState, useCallback} from 'react';
import Button from './Button'

const functions = new Set();

function App() {

  const [delta, setDelta] = useState(1);
  const [c, setC] = useState(0);

  const incrementDelta = useCallback(() => setDelta(delta => delta + 1), []);
  const increment = useCallback(() => setC(c => c + delta), []);

  functions.add(incrementDelta);
  functions.add(increment);


  return (
    <div className='app'>
      <h3>初次优化版</h3>
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


// https://nikgrozev.com/2019/04/07/reacts-usecallback-and-usememo-hooks-by-example/

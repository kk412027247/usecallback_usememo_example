import React, {useState, useCallback, memo, useMemo, useEffect} from 'react';
import './App.css';

const randomColor = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16);

const Button = memo(({onClick, children}) =>
  <button onClick={onClick} style={{background: randomColor()}}>
    {children}
  </button>
);

const functions = new Set();

function App() {

  const [delta, setDelta] = useState(1);
  const [c, setC] = useState(0);
  const sinOfC = useMemo(() => Math.sin(c) + Math.random(), [c]);

  const incrementDelta = useCallback(() => setDelta(delta => delta + 1), []);
  const increment = useCallback(() => setC(c => c + delta), [delta]);
  // const increment = useMemo(() => () => setC(c => c + delta), [delta]);

  functions.add(incrementDelta);
  functions.add(increment);

  useEffect(() => {
    console.log('hi');
    document.title = `You click ${c} times`
  }, [c]);

  return (
    <>
      <div>Delta is {delta}</div>
      <div>Counter is {c} </div>
      <div>Significant of C is {sinOfC}</div>
      <br/>
      <div>
        <Button onClick={incrementDelta}>Increment Delta</Button>
        <Button onClick={increment}>increment Counter</Button>
      </div>
      <br/>
      <div>Newly Created Functions: {functions.size - 2}</div>
    </>
  );
}


export default App;


// https://nikgrozev.com/2019/04/07/reacts-usecallback-and-usememo-hooks-by-example/

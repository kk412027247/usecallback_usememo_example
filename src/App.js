import React, {useState, useCallback, memo, useMemo} from 'react';
import './App.css';

const randomColor = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16);

const Button = memo(props =>
  <button onClick={props.onClick} style={{background: randomColor()}}>
    {props.children}
  </button>
);


// class Button extends React.Component {
//
//   shouldComponentUpdate(nextProps) {
//     console.log(nextProps.onClick !== this.props.onClick, this.props.children !== nextProps.children);
//     return nextProps.onClick !== this.props.onClick
//   }
//
//   componentDidUpdate(prevProps, prevState, snapshot) {
//     console.log('update')
//   }
//
//   render() {
//     return (
//       <button onClick={this.props.onClick} style={{background: randomColor()}}>
//         {this.props.children}
//       </button>
//     )
//   }
// }


const functions = new Set();

function App() {

  const [delta, setDelta] = useState(1);
  const [c, setC] = useState(0);
  const sinOfC = useMemo(() => Math.sin(c) + Math.random(), [c]);

  const incrementDelta = useCallback(() => setDelta(delta => delta + 1), []);
  const increment = useCallback(() => setC(c => c + delta), [delta]);
  // const increment = useMemo(() => () => setC(c => c + delta), [delta]);

  // const incrementBoth = useCallback(() => {
  //   incrementDelta();
  //   increment();
  // }, [increment, incrementDelta]);


  functions.add(incrementDelta);
  functions.add(increment);
  // functions.add(incrementBoth);

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

#### react hooks
[React hooks](https://reactjs.org/docs/hooks-intro.html) 发布截止到当前时间，已经差不多有一年了。
api已经趋于稳定，hooks api 可以以更加简介到方式编写react代码。
并且越来越多新到react组件也开始使用hooks api。
现在作一个简单的hooks的使用介绍，把括最基础到`useState`，性能优化用到的`useCallback`, `useMemo`,以及监听事件的`useEffect`。

#### 原始到模样

- 用`useState`定义state和stetState 方法，以下是范例。定义了一个 delta，同时定义了一个setDelta的设置函数，useState(1), 1为默认值。

```javascript    
const [delta, setDelta] = useState(1); 
```

- 定义一个`incrementDelta`函数调用`setDelta`,直接调用`setDelta`也是可以的。
```javascript 
 const incrementDelta = () => setDelta(delta => delta + 1);
``` 

- 以下是全部代码，终于可以在函数式组件中用state，而不用特意写一个完整到class了

```jsx harmony 

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

```

#### 初次优化版

- 我们已经定义了一个按钮组件，用来测试组建是否有重复渲染的，如果组件重复渲染列，按钮到颜色就会随机改变。
（这里使用列`React.memo`来控制组件不会重新刷新，除非传递进来的props发生改变，类似 `React.pureComponent`的作用，如果这个问题不了解，可以跳过，不太影响整篇阅读）

```jsx harmony
         
import React, {memo} from "react";

const randomColor = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16);

export default  memo(({onClick, children}) =>
  <button onClick={onClick} style={{background: randomColor()}}>
    {children}
  </button>
);

```    

- 重复渲染的出现，当我们点击 Increment Delta 或 increment Counter 的时候，functions 的长度都会增加2，并且两个按钮到颜色都同时改变了。
这是因为函数在执行到时候，每次都分别新创建了一个 incrementDelta 与 increment 函数，导致Button组件更新了。
正常的情况下，在更新 `c` 的时候，不需要重新创建incrementDelta才对，这样引起了不必要的额外更新。这样很可能会变成一个降低网页性能到问题。  

![0.png](https://upload-images.jianshu.io/upload_images/7505289-eea711efbe4f0c8f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 优化方案，一个方法是，直接把 incrementDelta 与 increment 移到函数体以外，这样就不会重复创建，并且引发额外重复渲染了，但是目前的代码不适用，因为这里用了组件的state。
所以我们的方法是，使用`useCallback` 这个hooks api。它接收一个函数作为参数，返回一个 `缓存` 版本。接受的第二个参数是一个数组，列出哪些清情况下会刷新储存到缓存。描述到有点抽象，看以下例子

```javascript 
  const incrementDelta = useCallback(() => setDelta(delta => delta + 1), []);
  const increment = useCallback(() => setC(c => c + delta), []);
```





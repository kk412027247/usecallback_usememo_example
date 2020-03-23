import React, {memo} from "react";

const randomColor = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16);

export default  memo(({onClick, children}) =>
  <button onClick={onClick} style={{background: randomColor()}}>
    {children}
  </button>
);

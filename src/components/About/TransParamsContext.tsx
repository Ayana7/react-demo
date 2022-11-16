import React, { useState, createContext, useContext } from "react";
const CountContext = createContext(0);

const TransParamsContext: React.FC = () => {
    const [count, setCount] = useState<number>(0);
  return (
    <div>
      <p>父组件点击数量：{count}</p>
      <button onClick={() => setCount(count + 1)}>{"点击+1"}</button>
      <CountContext.Provider value={count}>
        <Counter />
      </CountContext.Provider>
    </div>
  );
}

export default TransParamsContext;

const Counter = (props: any) =>  {
    const count = useContext(CountContext);
    return (
        <div>
            <div>子组件获得的点击数量：{count}</div>
        </div>
    )
  };
  
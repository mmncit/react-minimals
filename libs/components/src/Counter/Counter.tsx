import * as React from 'react';

export function Counter() {
  const [count, setCount] = React.useState(0);

  function adjustCount(amount: number) {
    setCount((currentCount) => currentCount + amount);
  }

  return (
    <>
      <button onClick={() => adjustCount(-1)}>-</button>
      <span>{count}</span>
      <button onClick={() => adjustCount(1)}>+</button>
    </>
  );
}

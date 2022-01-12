import React,{ useState } from "react";
function effectExample(){
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onclick={() => setCount(count + 1)}>
        click me
      </button>
    </div>
  );
}

export default effectExample
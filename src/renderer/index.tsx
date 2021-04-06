import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import { css } from "goober";
import "./styels/global";

const styles = {
  main: css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
};

const Root: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.main}>
      <h1>Hello, World!</h1>
      <h2>{count}</h2>
      <div>
        <input type="button" value="-" onClick={() => setCount((p) => p - 1)} />
        <input type="button" value="+" onClick={() => setCount((p) => p + 1)} />
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);

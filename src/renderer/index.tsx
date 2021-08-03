import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import { css, setup } from "goober";
import { GlobalStyle } from "./globalStyle";

setup(React.createElement);

const api = window.api;

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
      <div>
        <button onClick={() => api.openElectronDocs()}>Electron Docs</button>
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);

import React, { FC } from "react";
import ReactDOM from "react-dom";
import "./styels/global";

const Root: FC = () => {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);

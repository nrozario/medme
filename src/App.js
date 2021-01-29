import React from "react";

import Main from "./components/Main";

import "./App.css";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundColor: "rgb(240,240,240)",
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
    >
      <Main />
    </div>
  );
}

export default App;

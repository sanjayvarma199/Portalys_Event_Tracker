import React from "react";
import LinkGenerator from "../components/LinkGenerator";
import LiveStats from "../components/LiveStats";
import "../components/styling/App.css";

function App() {
  return (
    <div className="App">
      <h1>Tracking Links</h1>
      <div className="component-container">
        <LinkGenerator />
      </div>
      <div className="component-container">
        <LiveStats />
      </div>
    </div>
  );
}

export default App;

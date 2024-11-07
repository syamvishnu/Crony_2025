import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/home" exact element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

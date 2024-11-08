import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/home" element={<ProtectedRoutes component={Home} />} />
      </Routes>
    </div>
  );
}

export default App;

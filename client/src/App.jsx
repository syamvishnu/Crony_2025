import React from 'react'
import {BrowserRouter as Router, Routes,  Route } from 'react-router-dom'
import Login from './pages/Login'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Home from './pages/Home'

function App() {
  return (
    <div>
      <Routes>
        <Route  path="/" exact element={<Login/>} />
        <Route
          path="/home"
          element={<ProtectedRoutes component={Home} />}
        />
        </Routes>
    </div>
  )
}

export default App

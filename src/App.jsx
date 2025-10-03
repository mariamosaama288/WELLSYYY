import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from './pages/Homepage.jsx';
import Signup from './pages/Signup';
import Login from './pages/Login';
import "./styles/Auth.css";
import "./styles/Home.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
export default App;
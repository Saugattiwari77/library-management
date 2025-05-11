import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../src/Pages/Login/login";
import Signup from "./Pages/SignUp/Signup";
import HomePage from "../src/Pages/Design/MainHomePage";
import AdminDashboard from "../src/Pages/Admin /AdminPage";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<Login />} /> {/* fallback to login */}
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
      {/* Add more routes here */}
    </Routes>
  );
}

export default App;

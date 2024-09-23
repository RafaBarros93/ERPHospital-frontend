import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Contato from "@/pages/Contato";
import Dashboard from "@/pages/Dashboard";
import EditUser from "@/pages/EditUser";
import CreateUser from "@/pages/CreateUser";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CreateUser />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/edit-user" element={<EditUser />} />
    </Routes>
  );
};

export default AppRoutes;

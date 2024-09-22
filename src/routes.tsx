import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "@/components/Login";
import Home from "@/components/Home";
import Contato from "@/components/Contato";
import Dashboard from "@/components/Dashboard";
import EditUser from "@/components/EditUser";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/edit-user" element={<EditUser />} />
    </Routes>
  );
};

export default AppRoutes;

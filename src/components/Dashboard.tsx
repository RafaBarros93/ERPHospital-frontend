// src/components/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getUserByID } from "@/services";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [name, setName] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return null; // Para evitar renderizar o componente
    }

    const getUser = async () => {
      const response = await getUserByID(id);

      setName(response.name);
    };

    getUser();
  }, []);

  return (
    <Container>
      <Typography variant="h4">
        Bem-vindo {name}! O que deseja fazer hoje?
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/edit-user"
      >
        Alterar Dados Cadastrais
      </Button>
    </Container>
  );
};

export default Dashboard;

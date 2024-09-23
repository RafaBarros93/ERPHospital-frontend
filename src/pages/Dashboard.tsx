// src/components/Dashboard.tsx
import React, { useContext, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getUserByID } from "@/services";
import { UserContext } from "@/context/UserContext";

const Dashboard: React.FC = () => {
  const { user, setUser, addAddress } = useContext(UserContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return null; // Para evitar renderizar o componente
    }

    const getUser = async () => {
      const { name, email, phone, document, addresses } = await getUserByID(id);

      setUser({ ...user, name, email, phone, document, addresses });
    };

    getUser();
  }, []);

  return (
    <Container>
      <Typography variant="h4">
        Bem-vindo {user.name}! O que deseja fazer hoje?
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

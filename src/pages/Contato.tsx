import React from "react";
import { Container, Typography } from "@mui/material";

const Contato: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4">Entre em Contato</Typography>
      <Typography variant="body1">E-mail: contato@empresa.com</Typography>
      <Typography variant="body1">Telefone: (11) 99999-9999</Typography>
    </Container>
  );
};

export default Contato;

import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Menu: React.FC = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          ERP Hospitalar
        </Typography>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/home">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/contato">
          Entre em Contato
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;

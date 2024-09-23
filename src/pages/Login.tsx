// src/components/Login.tsx
import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import * as yup from "yup";
import { authenticateUser } from "@/services";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  // Definindo o esquema de validação para login
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais"
      )
      .required("Senha é obrigatória"),
  });

  // Função de login com validação
  const handleLogin = async () => {
    try {
      const data = { email, password };
      await validationSchema.validate(data, { abortEarly: false });

      const response = await authenticateUser(email, password);

      localStorage.setItem("token", response.token);
      localStorage.setItem("id", response.id);
      navigate("/dashboard");
    } catch (err: any) {
      const newErrors: any = {};
      err.inner.forEach((error: any) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      <TextField
        label="E-mail"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />

      <TextField
        label="Senha"
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />

      <Button variant="contained" color="primary" onClick={handleLogin}>
        Entrar
      </Button>
    </Container>
  );
};

export default Login;

import React, { useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import InputMask from "react-input-mask";
import * as yup from "yup";
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { createUser } from "@/services";
import { Address } from "@/interfaces/IAddress.Interfaces";
import { useNavigate } from "react-router-dom";

const EditUser: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState<Address>({
    zipCode: "",
    street: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState<any>({});

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[a-zA-Z\s]+$/, "O nome deve conter apenas letras e espaços")
      .min(4, "O nome deve ter no mínimo 4 caracteres")
      .required("Nome é obrigatório"),
    email: yup
      .string()
      .email("E-mail inválido")
      .required("E-mail é obrigatório"),
    phone: yup
      .string()
      .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Número de telefone inválido")
      .required("Telefone é obrigatório"),
    document: yup
      .string()
      .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "CPF inválido")
      .required("CPF é obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais"
      )
      .required("Senha é obrigatória"),
  });

  const handleAddAddress = () => {
    if (newAddress.street && newAddress.city && newAddress.state) {
      const isDuplicate = addresses.some(
        (address) =>
          address.zipCode === newAddress.zipCode &&
          address.street === newAddress.street &&
          address.city === newAddress.city &&
          address.state === newAddress.state
      );

      if (!isDuplicate) {
        setAddresses([...addresses, newAddress]);
        setNewAddress({ zipCode: "", street: "", city: "", state: "" });
      } else {
        alert("Endereço já cadastrado.");
      }
    }
  };

  const handleSave = async () => {
    try {
      const data = { name, email, phone, document, addresses, password };
      await validationSchema.validate(data, { abortEarly: false });

      await createUser(data);

      alert("Dados válidos e salvos com sucesso!");
      navigate("/login");
    } catch (err: any) {
      console.log(err);
      const newErrors: any = {};

      if (err.inner && err.inner.length > 0) {
        err.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }

      alert(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Cadastrar Usuário</Typography>
      <TextField
        label="Nome"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
      />

      <InputMask
        mask="999.999.999-99"
        value={document}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => setDocument(e.target.value)}
      >
        {() => <TextField label="CPF" fullWidth margin="normal" />}
      </InputMask>
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
      <TextField
        label="E-mail"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <InputMask
        mask="(99) 99999-9999"
        value={phone}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => setPhone(e.target.value)}
      >
        {() => <TextField label="Telefone" fullWidth margin="normal" />}
      </InputMask>

      <Typography variant="h6">Endereços</Typography>

      <InputMask
        mask="99999-999"
        value={newAddress.zipCode}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
      >
        {() => <TextField label="CEP" fullWidth margin="normal" />}
      </InputMask>

      <TextField
        label="Rua"
        fullWidth
        margin="normal"
        value={newAddress.street}
        onChange={(e) =>
          setNewAddress({ ...newAddress, street: e.target.value })
        }
        helperText={errors.name}
      />
      <TextField
        label="Cidade"
        fullWidth
        margin="normal"
        value={newAddress.city}
        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
        helperText={errors.name}
      />
      <TextField
        label="Estado"
        fullWidth
        margin="normal"
        value={newAddress.state}
        onChange={(e) =>
          setNewAddress({ ...newAddress, state: e.target.value })
        }
        helperText={errors.name}
      />
      <Button variant="contained" color="primary" onClick={handleAddAddress}>
        Adicionar Endereço
      </Button>

      <List>
        {addresses.map((address, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${address.zipCode} ${address.street}, ${address.city}, ${address.state}`}
            />
          </ListItem>
        ))}
      </List>

      <Button variant="contained" color="primary" onClick={handleSave}>
        Salvar
      </Button>
    </Container>
  );
};

export default EditUser;

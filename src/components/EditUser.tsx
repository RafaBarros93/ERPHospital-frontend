import React, { useState } from "react";
import * as yup from "yup";
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

interface Address {
  zipCode: string;
  street: string;
  city: string;
  state: string;
}

const EditUser: React.FC = () => {
  const [name, setName] = useState("João da Silva");
  const [email, setEmail] = useState("joao@gmail.com");
  const [phone, setPhone] = useState("(11) 99999-9999");
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
    cpf: yup
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
      const data = { name, email, phone, cpf, password };
      await validationSchema.validate(data, { abortEarly: false });
      alert("Dados válidos e salvos com sucesso!");
    } catch (err: any) {
      const newErrors: any = {};
      err.inner.forEach((error: any) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Container style={{ display: "block" }}>
      <Typography variant="h4">Editar Dados Cadastrais</Typography>
      <TextField
        label="Nome"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
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
      <TextField
        label="Telefone"
        fullWidth
        margin="normal"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        error={!!errors.phone}
        helperText={errors.phone}
      />

      <Typography variant="h6">Endereços</Typography>

      <TextField
        label="Cep"
        fullWidth
        margin="normal"
        value={newAddress.zipCode}
        onChange={(e) =>
          setNewAddress({ ...newAddress, zipCode: e.target.value })
        }
        helperText={errors.name}
      />

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

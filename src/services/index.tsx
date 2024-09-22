import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7110/user/",
});

interface IUserResponse {
  id: string;
  token: string;
}

export const authenticateUser = async (
  email: string,
  password: string
): Promise<IUserResponse> => {
  try {
    const { data } = await api.post("login", { email, password });

    return data;
  } catch (error) {
    throw new Error("Credenciais inválidas");
  }
};

export const getUserByID = async (id: string | null) => {
  try {
    const { data } = await api.get(`/${id}`);

    return data;
  } catch (error) {
    throw new Error("Credenciais inválidas");
  }
};

export default api;

import axios from 'axios';

const createCliente = () => {
  let token: string = '';
  if (typeof window !== 'undefined') {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      token = storedToken;
    }
  }

  const cliente = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return cliente;
}

const clienteAxios = createCliente();

export default clienteAxios; 
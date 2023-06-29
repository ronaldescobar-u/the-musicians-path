import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

async function login(email: string, password: string) {
  return axios
    .post(`${apiUrl}/authentication`, { email, password })
    .then(({ data }) => data);
}

export { login };

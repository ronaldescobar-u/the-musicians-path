import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

async function login(email: string, password: string) {
  return axios
    .post(`${apiUrl}/authentication`, { email, password })
    .then(({ data }) => data)
    .catch(error => {
      throw { status: error.response.status, data: error.response.data };
    })
}

async function createUser(firstName: string, lastName: string, email: string, password: string) {
  return axios
    .post(`${apiUrl}/users`, { firstName, lastName, email, password })
    .then(({ data }) => data);
}

export { login, createUser };

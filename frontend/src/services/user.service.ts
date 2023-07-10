import axios from '../utils/axios';

async function login(email: string, password: string) {
  return axios
    .post('/authentication', { email, password })
    .then(({ data }) => data)
    .catch(error => {
      throw { status: error.response.status, data: error.response.data };
    })
}

async function createUser(firstName: string, lastName: string, email: string, password: string) {
  return axios
    .post('/users', { firstName, lastName, email, password })
    .then(({ data }) => data);
}

export { login, createUser };

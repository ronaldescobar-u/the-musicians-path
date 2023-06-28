import axios from 'axios';

async function login(email: string, password: string) {
  return axios
    .post('http://localhost:3001/authentication', { email, password })
    .then(({ data }) => data);
}

export { login };

import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

async function getGenres() {
  return axios
    .get(`${apiUrl}/genres`)
    .then(({ data }) => data);
}

export { getGenres };

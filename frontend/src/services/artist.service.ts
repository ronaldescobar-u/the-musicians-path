import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

async function getArtists() {
  return axios
    .get(`${apiUrl}/artists`)
    .then(({ data }) => data);
}

export { getArtists };

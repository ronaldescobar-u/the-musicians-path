import axios from '../utils/axios';

async function getArtists() {
  return axios
    .get('/artists')
    .then(({ data }) => data);
}

export { getArtists };

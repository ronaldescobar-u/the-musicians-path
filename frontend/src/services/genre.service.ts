import axios from '../utils/axios';

async function getGenres() {
  return axios
    .get('/genres')
    .then(({ data }) => data);
}

export { getGenres };

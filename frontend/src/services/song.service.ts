import axios from '../utils/axios';

async function getSongs(searchQuery: string, artistId: number, genreId: number) {
  return axios
    .get('/songs', { params: { searchQuery, artistId, genreId } })
    .then(({ data }) => data);
}

async function getSong(id: number) {
  return axios
    .get(`/songs/${id}`)
    .then(({ data }) => data);
}

async function createSong(name: string, artistId: number, genreId: number, difficulty: number) {
  return axios
    .post('/songs', { name, artistId, genreId, difficulty })
    .then(({ data }) => data);
}

async function updateSong(id: number, name: string, artistId: number, genreId: number, difficulty: number) {
  return axios
    .put(`/songs/${id}`, { name, artistId, genreId, difficulty })
    .then(({ data }) => data);
}

async function deleteSong(id: number) {
  return axios
    .delete(`/songs/${id}`)
    .then(({ data }) => data);
}

async function getCommentsOfSong(id: number) {
  return axios
    .get(`/songs/${id}/comments`)
    .then(({ data }) => data);
}

async function postCommentToSong(id: number, comment: any) {
  return axios
    .post(`/songs/${id}/comments`, { name, description })
    .then(({ data }) => data);
}

export { getSongs, getSong, createSong, updateSong, deleteSong, getCommentsOfSong, postCommentToSong };

import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

async function getSongs(searchQuery: string) {
  return axios
    .get(`${apiUrl}/songs`, { params: { searchQuery } })
    .then(({ data }) => data);
}

async function getSong(id: number) {
  return axios
    .get(`${apiUrl}/songs/${id}`)
    .then(({ data }) => data);
}

async function createSong(name: string, description: string) {
  return axios
    .post(`${apiUrl}/songs`, { name, description })
    .then(({ data }) => data);
}

async function updateSong(id: number, name: string, description: string) {
  return axios
    .put(`${apiUrl}/songs/${id}`, { name, description })
    .then(({ data }) => data);
}

async function deleteSong(id: number) {
  return axios
    .delete(`${apiUrl}/songs/${id}`)
    .then(({ data }) => data);
}

async function getCommentsOfSong(id: number) {
  return axios
    .get(`${apiUrl}/songs/${id}/comments`)
    .then(({ data }) => data);
}

async function postCommentToSong(id: number, comment: any) {
  return axios
    .post(`${apiUrl}/songs/${id}/comments`, { name, description })
    .then(({ data }) => data);
}

export { getSongs, getSong, createSong, updateSong, deleteSong };

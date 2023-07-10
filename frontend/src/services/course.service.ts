import axios from '../utils/axios';

async function getCourses(searchQuery: string) {
  return axios
    .get('/courses', { params: { searchQuery } })
    .then(({ data }) => data);
}

async function getCourse(id: number) {
  return axios
    .get(`/courses/${id}`)
    .then(({ data }) => data);
}

async function createCourse(name: string, description: string) {
  return axios
    .post('/courses', { name, description })
    .then(({ data }) => data);
}

async function updateCourse(id: number, name: string, description: string) {
  return axios
    .put(`/courses/${id}`, { name, description })
    .then(({ data }) => data);
}

async function deleteCourse(id: number) {
  return axios
    .delete(`/courses/${id}`)
    .then(({ data }) => data);
}

async function getRatingsOfCourse(id: number) {
  return axios
    .get(`/courses/${id}/ratings`)
    .then(({ data }) => data);
}

async function submitRatingToCourse(id: number, rating: any) {
  return axios
    .post(`/courses${id}/ratings`, { name, description })
    .then(({ data }) => data);
}

async function enrollUserToCourse(id: number) {
  return axios
    .post(`/courses${id}/users`, { name, description })
    .then(({ data }) => data);
}

async function addSongToCourse(id: number, rating: any) {
  return axios
    .post(`/courses${id}/songs`, { name, description })
    .then(({ data }) => data);
}

async function completeSongOfCourse(id: number, rating: any) {
  return axios
    .put(`/courses${id}/songs`, { name, description })
    .then(({ data }) => data);
}

export {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getRatingsOfCourse,
  submitRatingToCourse,
  enrollUserToCourse,
  addSongToCourse,
  completeSongOfCourse
};

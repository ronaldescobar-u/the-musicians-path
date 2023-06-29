import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

async function getCourses(searchQuery: string) {
  return axios
    .get(`${apiUrl}/courses`, { params: { searchQuery } })
    .then(({ data }) => data);
}

async function getCourse(id: number) {
  return axios
    .get(`${apiUrl}/courses/${id}`)
    .then(({ data }) => data);
}

async function createCourse(name: string, description: string) {
  return axios
    .post(`${apiUrl}/courses`, { name, description })
    .then(({ data }) => data);
}

async function updateCourse(id: number, name: string, description: string) {
  return axios
    .put(`${apiUrl}/courses/${id}`, { name, description })
    .then(({ data }) => data);
}

async function deleteCourse(id: number) {
  return axios
    .delete(`${apiUrl}/courses/${id}`)
    .then(({ data }) => data);
}

async function getRatingsOfCourse(id: number) {
  return axios
    .get(`${apiUrl}/courses/${id}/ratings`)
    .then(({ data }) => data);
}

async function submitRatingToCourse(id: number, rating: any) {
  return axios
    .post(`${apiUrl}/courses${id}/ratings`, { name, description })
    .then(({ data }) => data);
}

async function enrollUserToCourse(id: number, rating: any) {
  return axios
    .post(`${apiUrl}/courses${id}/users`, { name, description })
    .then(({ data }) => data);
}

async function addSongToCourse(id: number, rating: any) {
  return axios
    .post(`${apiUrl}/courses${id}/songs`, { name, description })
    .then(({ data }) => data);
}

export { getCourses, getCourse, createCourse, updateCourse, deleteCourse };

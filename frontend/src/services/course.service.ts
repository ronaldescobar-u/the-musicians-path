import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

async function createCourse(name: string, description: string) {
  return axios
    .post(`${apiUrl}/course`, { name, description })
    .then(({ data }) => data);
}

async function updateCourse(id: number, name: string, description: string) {
  return axios
    .put(`${apiUrl}/course/${id}`, { name, description })
    .then(({ data }) => data);
}

export { createCourse, updateCourse };

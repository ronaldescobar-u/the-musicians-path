import axios from 'axios';

async function createCourse(name: string, description: string) {
  return axios
    .post('http://localhost:3001/course', { name, description })
    .then(({ data }) => data);
}

export { createCourse };

import axios from "axios";
import tokenUtils from "../utils/token";

const apiUrl = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: apiUrl ?? "http://localhost:3001",
});

instance.interceptors.request.use(
  (config) => {
    const token =
      config.url !== "/authentication/refresh"
        ? tokenUtils.getAccessToken()
        : tokenUtils.getRefreshToken();
    if (token && config.headers) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalConfig = err.config;

    if (err.response && err.response.status === 401) {
      if (originalConfig.url !== "/authentication/refresh") {
        const refreshResponse = await instance.post("/authentication/refresh");

        if (refreshResponse.status === 200) {
          const { accessToken, refreshToken } = refreshResponse.data;
          tokenUtils.saveTokens(accessToken, refreshToken);
          return instance(originalConfig);
        }
        return Promise.reject(err);
      } else {
        tokenUtils.removeTokens();
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default instance;

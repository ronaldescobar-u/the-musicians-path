import jwtDecode from "jwt-decode";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || '';
};

const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY) || '';
};

const getUserId = (): number => {
  const decoded = jwtDecode<{ sub: number }>(getAccessToken());
  return decoded.sub;
};

const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export default {
  getAccessToken,
  getRefreshToken,
  getUserId,
  saveTokens,
  removeTokens,
};

import axios from "axios";
let baseURL = process.env.REACT_APP_API_URL;

const Api = axios.create({
  baseURL: `${baseURL}`,
  headers: { "content-type": "application/json" },
});

const Config = (config) => {
  const user_token = JSON.parse(localStorage.getItem("user_token"));

  if (user_token) {
    config.headers.Authorization = "Bearer " + user_token;
  }
  return config;
};

Api.interceptors.request.use(Config);

export const post = async (route, values) => {
  try {
    const { data } = await Api.post(route, values);
    return data;
  } catch (err) {
    return err.response.data.message;
  }
};

export default Api;

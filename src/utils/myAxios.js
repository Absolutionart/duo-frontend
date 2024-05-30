import axios from "axios";

const myAxios = axios.create({
  baseURL: "http://localhost:8080/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

myAxios.defaults.withCredentials = true; // 允许携带cookie

myAxios.interceptors.request.use(
  (config) => {
    console.log("我要发请求啦", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

myAxios.interceptors.response.use(
  (response) => {
    console.log("我收到响应啦", response);
    if (response.status === 200) {
      return response.data;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default myAxios;

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
})

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(JSON.stringify(error))
  }
)

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    throw error
  }
)

export default instance;
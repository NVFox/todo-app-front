import { AvailableErrors, ErrorResponseStatus, ValidationException } from "@/dto/error.dto";
import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
})

instance.interceptors.request.use(
  (config) => {
    return config;
  },
)

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error: AxiosError<AvailableErrors>) => {
    if (error.response) {
      const { data: response } = error.response;
      if (response.type === ErrorResponseStatus.VALIDATION_ERROR) {
        throw new ValidationException(response);
      }
    }
  }
)

export default instance;
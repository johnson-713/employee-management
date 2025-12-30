import axios from "axios";
import getHostAPIUrl from "./appConfig";
import { getUserToken } from "@/utils/tokenAndUserData";
import { authEndpoints } from "./endpoints/endpoints";

export default function appAxios() {
  const axiosCreate = axios.create({
    baseURL: getHostAPIUrl(),
    timeout: 30000,
    responseType: "json",
  });

  const userToken = getUserToken().access_token;

  const isAuthEndpoint = (url?: string) => {
    return url && [authEndpoints.login].some((ep) => url.includes(ep));
  };

  if (userToken) {
    axiosCreate.interceptors.request.use(
      async (config) => {
        // Don't send Authorization for login/refresh
        if (!isAuthEndpoint(config.url)) {
          const userToken = getUserToken().access_token;
          if (userToken) {
            config.headers.Authorization = `Bearer ${userToken}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  return axiosCreate;
}

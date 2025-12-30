import axios from "axios";
import getHostAPIUrl from "./appConfig";
import {
  clearTokenAndUserData,
  getUserToken,
  setTokenAloneInCookies,
} from "@/utils/tokenAndUserData";
import { isExpired } from "./validateToken";
import { authEndpoints } from "./endpoints/endpoints";
import makePostRequest from "./makePostRequest";

let isRefreshing = false;
let refreshSubscribers: ((newToken?: string) => void)[] = [];

export default function appAxios() {
  const axiosCreate = axios.create({
    baseURL: getHostAPIUrl(),
    timeout: 30000,
    responseType: "json",
  });

  const userToken = getUserToken().access_token;
  const ref_token = getUserToken().refresh_token;

  const subscribeToRefreshToken = (callback: (newToken?: string) => void) => {
    refreshSubscribers.push(callback);
  };

  const retryFailedRequests = (newToken?: string) => {
    refreshSubscribers.forEach((callback) => callback(newToken));
    refreshSubscribers = [];
  };

  const isAuthEndpoint = (url?: string) => {
    return (
      url &&
      [
        authEndpoints.login,
        authEndpoints.refresh,
        authEndpoints.sendOtp,
        authEndpoints.verifyOtp,
        authEndpoints.resendOtp,
      ].some((ep) => url.includes(ep))
    );
  };

  if (userToken || ref_token) {
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

    axiosCreate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error?.config;
        const status = error?.response?.status;
        const validateTokenTime = await isExpired();

        if (
          ((status === 401 && originalRequest._retry) || status === 403) &&
          validateTokenTime
        ) {
          if (isRefreshing) {
            return new Promise((resolve) => {
              subscribeToRefreshToken((newToken?: string) => {
                if (!isAuthEndpoint(originalRequest.url)) {
                  originalRequest.headers.Authorization = `Bearer ${newToken}`;
                }
                resolve(axios(originalRequest));
              });
            });
          }

          isRefreshing = true;

          try {
            const ref_token = getUserToken().refresh_token;
            const data = await makePostRequest(authEndpoints.refresh, {
              refresh_token: ref_token,
            });
            const { tokens } = data?.data || {};

            if (tokens?.refresh_token) {
              setTokenAloneInCookies({
                access_token: tokens?.access_token,
                refresh_token: tokens?.refresh_token,
              });

              if (!isAuthEndpoint(originalRequest.url)) {
                originalRequest.headers.Authorization = `Bearer ${tokens?.access_token}`;
              }
              retryFailedRequests(tokens?.access_token);

              return axios(originalRequest);
            }
          } catch {
            clearTokenAndUserData();
            window.location.replace("/login");
          } finally {
            isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  return axiosCreate;
}

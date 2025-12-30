import Cookies from "js-cookie";
import type { IUserData } from "@/types/types";

const cookieAge = 30;

const setTokenAndUserDataInCookies = ({
  access_token,
  refresh_token,
  userData,
}: {
  access_token: string;
  refresh_token: string;
  userData: IUserData;
}) => {
  Cookies.set("access_token", access_token, { expires: cookieAge });
  Cookies.set("refresh_token", refresh_token, { expires: cookieAge });
  Cookies.set("user_data", JSON.stringify(userData), { expires: cookieAge });
};

const setTokenAloneInCookies = ({
  access_token,
  refresh_token,
}: {
  access_token: string;
  refresh_token: string;
}) => {
  Cookies.set("access_token", access_token, { expires: cookieAge });
  Cookies.set("refresh_token", refresh_token, { expires: cookieAge });
};

const getUserToken = () => {
  return {
    access_token: Cookies.get("access_token") || null,
    refresh_token: Cookies.get("refresh_token") || null,
  };
};

const getUserData = (): IUserData | null => {
  const userData = Cookies.get("user_data");
  return userData ? JSON.parse(userData) : null;
};

const clearTokenAndUserData = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  Cookies.remove("user_data");
};

export {
  setTokenAndUserDataInCookies,
  clearTokenAndUserData,
  setTokenAloneInCookies,
  getUserToken,
  getUserData,
};

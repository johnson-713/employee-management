import Cookies from "js-cookie";
import type { IUserData } from "@/types/types";

const cookieAge = 30;

const setTokenAndUserDataInCookies = ({
  access_token,
}: {
  access_token: string;
}) => {
  Cookies.set("access_token", access_token, { expires: cookieAge });
};

const setTokenAloneInCookies = ({ access_token }: { access_token: string }) => {
  Cookies.set("access_token", access_token, { expires: cookieAge });
};

const getUserToken = () => {
  return {
    access_token: Cookies.get("access_token") || null,
  };
};

const getUserData = (): IUserData | null => {
  return null;
};

const clearTokenAndUserData = () => Cookies.remove("access_token");

export {
  setTokenAndUserDataInCookies,
  clearTokenAndUserData,
  setTokenAloneInCookies,
  getUserToken,
  getUserData,
};

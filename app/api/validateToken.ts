import { getUserToken } from "@/utils/tokenAndUserData";
import { jwtDecode, type JwtPayload } from "jwt-decode";

export const isExpired = async (): Promise<boolean> => {
  const userToken = await getUserToken();
  const currentDate = new Date();

  if (!userToken?.access_token) {
    return true;
  }

  try {
    const decodedToken = jwtDecode<JwtPayload>(userToken?.access_token);

    if (decodedToken?.exp && decodedToken.exp * 1000 < currentDate.getTime()) {
      return true;
    }
  } catch (error) {
    console.error("Invalid token:", error);
    return true; // treat invalid token as expired
  }

  return false;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { setTokenAndUserDataInCookies } from "@/utils/tokenAndUserData";
import type { ILoginResponse } from "@/types/types";

const useAuth = () => {
  const handleLoginSuccess = useCallback((response: ILoginResponse) => {
    try {
      const { accessToken } = response;
      // Store tokens in cookies and state
      setTokenAndUserDataInCookies({ access_token: accessToken });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    handleLoginSuccess,
  };
};

export default useAuth;

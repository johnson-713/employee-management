"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUserToken } from "@/utils/tokenAndUserData";

const AuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = getUserToken().access_token;
    const isLoginPage = pathname === "/login";
    const isRootPage = pathname === "/";

    // Skip redirect logic for root page (handled by page.tsx)
    if (isRootPage) {
      return;
    }

    // If user has token and is on login page, redirect to employees
    if (token && isLoginPage) {
      router.push("/employees");
      return;
    }

    // If user doesn't have token and is not on login page, redirect to login
    if (!token && !isLoginPage) {
      router.push("/login");
      return;
    }
  }, [pathname, router]);

  return null;
};

export default AuthRedirect;

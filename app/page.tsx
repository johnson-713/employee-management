"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserToken } from "@/utils/tokenAndUserData";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getUserToken().access_token;
    
    // If no access_token, redirect to login
    if (!token) {
      router.push("/login");
    } else {
      // If access_token exists, redirect to employees
      router.push("/employees");
    }
  }, [router]);

  // Return null or a loading state while redirecting
  return null;
}

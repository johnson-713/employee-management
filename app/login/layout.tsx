"use client";
import { getUserToken } from "@/utils/tokenAndUserData";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
  childrenClassName?: string;
}

const AuthLayout = ({ children, childrenClassName }: AuthLayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    const tokens = getUserToken();
    if (tokens.access_token) {
      router.push("/employees");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  px-4 py-8">
      <div className={`w-full max-w-md ${childrenClassName}`}>{children}</div>
    </div>
  );
};

export default AuthLayout;

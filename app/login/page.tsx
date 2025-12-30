"use client";
import { useForm, type FieldValues, type UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import AppImage from "@/components/AppImage/AppImage";
import AppText from "@/components/AppText/AppText";
import { BGmarzi, MarziLogo } from "@/assets";
import type { InputType } from "@/types/types";
import AppForm from "@/components/form/AppForm";
import makePostRequest from "@/api/makePostRequest";
import { authEndpoints } from "@/api/endpoints/endpoints";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
function LoginComp() {
  const loginForm = useForm({
    defaultValues: { username: "", password: "" },
  });

  const router = useRouter();

  // phone form fields
  const phoneInputs = [
    {
      render: [
        {
          name: "username",
          label: "Username",
          placeholder: "Enter your username",
          type: "text" as InputType,
        },
        {
          name: "password",
          label: "Password",
          placeholder: "Enter your password",
          type: "password" as InputType,
        },
      ],
    },
  ];

  const { handleLoginSuccess } = useAuth();

  const { mutate: loginMutation, isPending: otpPending } = useMutation({
    mutationFn: (data: { username: string; password: string }) =>
      makePostRequest(authEndpoints.login, data),
    onSuccess: (data) => {
      toast.success("Login Successfully !");
      handleLoginSuccess(data);
      router.push("/employees");
    },
    onError: (error: unknown) => {
      let errMsg = "An error occurred";

      // Handle Axios errors
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        errMsg = axiosError.response?.data?.message || errMsg;
      }
      // Handle regular Error objects
      else if (error instanceof Error) {
        errMsg = error.message;
      }

      toast.error(errMsg);
      console.log(errMsg);
    },
  });

  const handleLoginSubmit = (data: FieldValues) => {
    const formData = data as { username: string; password: string };
    loginMutation(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <AppImage
        src={BGmarzi}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 flex flex-col items-center">
        <AppImage
          src={MarziLogo}
          alt="Marzi Logo"
          className="w-[280px] h-auto mb-1"
          width={280}
          height={100}
        />
        <div className="bg-white rounded-2xl p-8 shadow-md md:w-[500px] max-w-[350px] md:max-w-[100%]">
          <>
            <AppText className="text-xl font-bold mb-3">
              Login to Account
            </AppText>
            <AppForm
              inputArr={phoneInputs}
              formUtils={loginForm as unknown as UseFormReturn<FieldValues>}
              onSubmit={handleLoginSubmit}
              noDefaultButtons
              formClassName="flex flex-col"
            >
              <div className="flex justify-center items-center">
                <Button
                  type="submit"
                  loading={otpPending}
                  className="w-[150px] md:w-[330px] h-10 rounded-md bg-primary hover:bg-[#741957] mt-[30px]"
                >
                  Login
                </Button>
              </div>
            </AppForm>
          </>
        </div>
      </div>
    </div>
  );
}

export default LoginComp;

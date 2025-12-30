import {
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormItem } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import type { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

interface AppInputProps<T extends FieldValues> {
  label?: string;
  description?: string;
  topDescription?: string;
  name: Path<T>;
  formUtils: UseFormReturn<T>;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  type?: "text" | "password" | "email" | "number";
  formMessageClassName?: string;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  onPasswordChangeClick?: () => void;
  changePasswordText?: string;
  required?: boolean;
}

const AppInput = <T extends FieldValues>({
  label,
  description,
  topDescription,
  formUtils,
  name,
  placeholder,
  className,
  labelClassName,
  inputClassName,
  type = "text",
  formMessageClassName,
  disabled = false,
  readOnly = false,
  maxLength,
  required = false,
}: AppInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      control={formUtils.control}
      name={name}
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <FormItem className={className}>
          {label && (
            <div
              className={`mb-[8px] flex items-center justify-between ${labelClassName}`}
            >
              <FormLabel className="m-0 text-sm text-[#18181B] font-medium">
                {label}
                {required && <span className="text-red-500 -ml-[2px]">*</span>}
              </FormLabel>
            </div>
          )}
          {topDescription && (
            <FormDescription className="mt-[-6px] mb-2">
              {topDescription}
            </FormDescription>
          )}
          <FormControl>
            <div className="relative">
              <Input
                readOnly={readOnly}
                placeholder={placeholder}
                onChange={(e) => {
                  let value: string | number = e.target.value;

                  if (type === "number") {
                    // Convert empty string to undefined to allow clearing field
                    value = value === "" ? "" : Number(value);
                  }

                  onChange(value);
                }}
                type={
                  type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : type
                }
                className={`${inputClassName} ${
                  type === "password" ? "pr-10" : ""
                }`}
                disabled={disabled}
                aria-invalid={!!error}
                {...field}
                maxLength={maxLength}
              />
              {type === "password" && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={togglePassword}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className={formMessageClassName} />
        </FormItem>
      )}
    />
  );
};

export default AppInput;

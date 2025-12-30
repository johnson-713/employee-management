import type { UseFormReturn } from "react-hook-form";
import AppInput from "./AppInput";
import type { InputGroup, InputConfig } from "@/types/types";
import AppText from "@/components/AppText/AppText";

// interface SelectOption {
//   label: string;
//   value: string;
// }

interface AppInputRendererProps {
  inputArr: InputGroup[];
  formUtils: UseFormReturn;
  formWrapperClassName?: string;
  labelClassName?: string;
}

const AppInputRenderer = ({
  inputArr,
  formUtils,
  formWrapperClassName,
  labelClassName,
}: AppInputRendererProps) => {
  const renderInput = (input: InputConfig) => {
    // Check if input should be conditionally rendered
    if (
      input.conditionalRender &&
      !input.conditionalRender(formUtils.watch())
    ) {
      return null;
    }

    switch (input.type) {
      case "text":
        return (
          <AppInput
            key={input.name}
            name={input.name}
            label={input.label}
            description={input.description}
            topDescription={input.topDescription}
            placeholder={input.placeholder}
            formUtils={formUtils}
            className={input.className}
            labelClassName={`${labelClassName} ${input.labelClassName}`}
            inputClassName={input.inputClassName}
            required={input.required}
            // pass-through optional flags
            readOnly={input.readOnly}
            disabled={input.disabled}
            onPasswordChangeClick={input.onPasswordChangeClick}
            changePasswordText={input.changePasswordText}
          />
        );

      case "custom-comp":
        return input.customComp;

      case "password":
        return (
          <AppInput
            type={input.type}
            key={input.name}
            name={input.name}
            label={input.label}
            description={input.description}
            topDescription={input.topDescription}
            placeholder={input.placeholder}
            formUtils={formUtils}
            className={input.className}
            labelClassName={`${labelClassName} ${input.labelClassName}`}
            inputClassName={input.inputClassName}
            formMessageClassName={input.formMessageClassName}
          />
        );

      default: {
        // Only pass type if it's a valid HTML input type
        const validInputTypes = [
          "text",
          "password",
          "email",
          "number",
        ] as const;
        const inputType = validInputTypes.includes(
          input.type as (typeof validInputTypes)[number]
        )
          ? (input.type as "text" | "password" | "email" | "number")
          : undefined;
        return (
          <AppInput
            type={inputType}
            key={input.name}
            name={input.name}
            label={input.label}
            description={input.description}
            topDescription={input.topDescription}
            placeholder={input.placeholder}
            formUtils={formUtils}
            className={input.className}
            labelClassName={`${labelClassName} ${input.labelClassName}`}
            inputClassName={input.inputClassName}
            formMessageClassName={input.formMessageClassName}
            readOnly={input.readOnly}
            disabled={input.disabled}
            onPasswordChangeClick={input.onPasswordChangeClick}
            changePasswordText={input.changePasswordText}
          />
        );
      }
    }
  };

  return (
    <div
      className={`grid grid-cols-1 gap-4 items-baseline ${formWrapperClassName}`}
    >
      {inputArr?.map((group, groupIndex) => (
        <div key={groupIndex} className={group.outerWrapperClassName}>
          {group?.subTitle && (
            <AppText
              text={group.subTitle}
              className={`${
                group.subTitleClassName ||
                "text-[18px] mb-2 font-bold text-primary"
              }`}
            />
          )}
          <div
            className={`grid grid-cols-1 gap-4 items-baseline ${group.wrapperClassName}`}
          >
            {group.render.map((input: InputConfig) => (
              <div
                key={input.name}
                className={`block w-full ${input.className}`}
              >
                {renderInput(input)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppInputRenderer;

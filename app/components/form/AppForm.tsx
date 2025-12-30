import { Form } from "@/components/ui/form";
import type {
  UseFormReturn,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
import SkeletonFormFields from "@/components/loaders/SkeletonFormFields";
import { Button } from "@/components/ui/button";
import { InputGroup } from "@/types/types";
import AppInputRenderer from "./AppInputRenderer";
// import { memo } from "react";

interface AppFormProps {
  inputArr: InputGroup[];
  onSubmit: SubmitHandler<FieldValues>;
  formUtils: UseFormReturn<FieldValues>;
  className?: string;
  formClassName?: string;
  children?: React.ReactNode;
  topChildren?: boolean;
  formWrapperClassName?: string;
  isLoading?: boolean;
  fieldsCount?: number;
  skeletonWrapperClassName?: string;
  noDefaultButtons?: boolean;
  onSecondaryButtonClick?: () => void;
  isSubmitting?: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryBtnType?: "submit" | "button";
  onPrimaryButtonClick?: () => void;
  secondaryButtonDisabled?: boolean;
  labelClassName?: string;
}

const AppForm = ({
  inputArr,
  onSubmit,
  formUtils,
  className,
  formClassName,
  children,
  topChildren = false,
  formWrapperClassName,
  isLoading = false,
  fieldsCount = 2,
  skeletonWrapperClassName,
  noDefaultButtons = false,
  onSecondaryButtonClick,
  isSubmitting = false,
  primaryButtonText = "Submit",
  secondaryButtonText = "Cancel",
  primaryBtnType = "submit",
  onPrimaryButtonClick,
  secondaryButtonDisabled,
  labelClassName,
}: AppFormProps) => {
  if (isLoading)
    return (
      <SkeletonFormFields
        skeletonWrapperClassName={`${skeletonWrapperClassName}`}
        fieldsCount={fieldsCount}
      />
    );

  return (
    <div className={className}>
      <Form {...formUtils}>
        <form
          onSubmit={formUtils.handleSubmit(onSubmit)}
          className={formClassName}
        >
          {topChildren && children}
          <AppInputRenderer
            labelClassName={labelClassName}
            inputArr={inputArr}
            formUtils={formUtils}
            formWrapperClassName={formWrapperClassName}
          />
          {!topChildren && children}
          {!noDefaultButtons && (
            <div className="flex justify-end gap-2 mt-5">
              <Button
                type="button"
                onClick={() => onSecondaryButtonClick?.()}
                variant="outline"
                disabled={secondaryButtonDisabled}
              >
                {secondaryButtonText}
              </Button>
              <Button
                onClick={onPrimaryButtonClick}
                type={primaryBtnType}
                loading={isSubmitting}
              >
                {primaryButtonText}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default AppForm;

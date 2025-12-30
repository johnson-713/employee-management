import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  showCloseButton?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  titleClassName?: string;
}

const sizeClassMap = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  full: "sm:max-w-[95vw]",
};

const AppModal: React.FC<AppModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  showCloseButton = true,
  size = "md",
  className,
  titleClassName,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`${sizeClassMap[size]} ${className}`}
        showCloseButton={showCloseButton}
      >
        <DialogHeader>
          <DialogTitle className={titleClassName}>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default AppModal;

// Warning Modal Component
interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: React.ReactNode;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  isLoading?: boolean;
}

export const WarningModal: React.FC<WarningModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  size = "sm",
  isLoading = false,
}) => {
  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      size={size}
      footer={
        <div className="flex gap-3 justify-end w-full">
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button
            loading={isLoading}
            variant="base_primary"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      }
    />
  );
};

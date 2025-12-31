import type { ReactNode } from "react";

const AppPageWrapper = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`px-8 py-6 rounded-md h-[calc(100%-26px)] ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default AppPageWrapper;

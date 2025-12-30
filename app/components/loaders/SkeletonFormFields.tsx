import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonFormFieldsProps {
  fieldsCount?: number;
  skeletonWrapperClassName?: string;
}

const SkeletonFormFields = ({
  fieldsCount = 2,
  skeletonWrapperClassName,
}: SkeletonFormFieldsProps) => {
  return (
    <div className={`space-y-6 ${skeletonWrapperClassName}`}>
      {Array.from({ length: fieldsCount }).map((_, idx) => (
        <div key={idx}>
          <Skeleton className="h-4 w-32 mb-2" /> {/* Label skeleton */}
          <Skeleton className="h-10 w-full rounded-md" /> {/* Input skeleton */}
        </div>
      ))}
    </div>
  );
};

export default SkeletonFormFields;

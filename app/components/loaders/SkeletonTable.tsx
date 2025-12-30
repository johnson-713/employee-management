import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonTableProps {
  columns?: number;
  rows?: number;
  className?: string;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({
  columns = 5,
  rows = 8,
  className,
}) => {
  return (
    <div className={className}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, colIdx) => (
              <th key={colIdx}>
                <Skeleton
                  className="my-2.5!"
                  style={{ height: 20, width: "80%" }}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx}>
              {Array.from({ length: columns }).map((_, colIdx) => (
                <td key={colIdx} style={{ padding: 8 }}>
                  <Skeleton
                    className="!my-1.75"
                    style={{ height: 16, width: `${60 + (colIdx % 3) * 20}%` }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;

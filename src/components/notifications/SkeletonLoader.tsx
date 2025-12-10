import React from "react";

interface SkeletonProps {
  count?: number;
  className?: string;
}

const NotificationSkeletonLoader: React.FC<SkeletonProps> = ({
  count = 3,
  className = "",
}) => {
  return (
    <div className={`space-y-4 w-full ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative overflow-hidden border border-neutral-800 rounded-xl bg-neutral-900/40 p-4"
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-neutral-700/10 to-transparent" />

          <div className="flex items-start gap-3">
            {/* Icon placeholder */}
            <div className="h-10 w-10 rounded-full bg-neutral-800" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/2 bg-neutral-800 rounded" />

              <div className="h-3 w-3/4 bg-neutral-800 rounded" />
              <div className="h-3 w-1/2 bg-neutral-800 rounded" />

              <div className="h-3 w-24 bg-neutral-800 rounded mt-3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeletonLoader;

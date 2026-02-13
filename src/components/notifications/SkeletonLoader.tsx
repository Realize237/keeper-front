import React from 'react';

interface SkeletonProps {
  count?: number;
  className?: string;
}

const NotificationSkeletonLoader: React.FC<SkeletonProps> = ({
  count = 3,
  className = '',
}) => {
  return (
    <div className={`space-y-4 w-full ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative overflow-hidden border border-border rounded-xl bg-surface p-4"
        >
          <div className="absolute inset-0 -translate-x-full skeleton " />

          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full skeleton" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/2 skeleton rounded" />

              <div className="h-3 w-3/4 skeleton rounded" />
              <div className="h-3 w-1/2 skeleton rounded" />

              <div className="h-3 w-24 skeleton rounded mt-3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSkeletonLoader;

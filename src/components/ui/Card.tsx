interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`
        relative
        rounded-2xl
        bg-surface
        p-6
        shadow-sm
        border border-border
        ${className ?? ''}
      `}
    >
      {children}
    </div>
  );
};

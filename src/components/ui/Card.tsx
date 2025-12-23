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
        bg-[#1C1C1E]
        p-6
        shadow-sm
        border border-white/5
        ${className ?? ''}
      `}
    >
      {children}
    </div>
  );
};

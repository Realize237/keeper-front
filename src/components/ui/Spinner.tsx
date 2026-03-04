const Spinner = ({ className }: { className?: string }) => {
  return (
    <span
      className={`spinner w-5 h-5 border-2 border-border border-t-transparent rounded-full animate-spin ${className || ''}`}
    />
  );
};

export default Spinner;

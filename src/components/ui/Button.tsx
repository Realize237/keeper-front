import { groupClassNames } from '../../utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  loading,
  className,
  children,
  ...props
}) => {
  const isButtonInActive = loading || props.disabled;
  return (
    <button
      {...props}
      disabled={isButtonInActive}
      className={groupClassNames(
        `w-ful text-black font-semibold rounded-full py-3 px-5 mb-6 text-lg hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2`,
        className,
        isButtonInActive ? 'bg-neutral-500 cursor-not-allowed' : 'bg-[#CDFF00]'
      )}
    >
      {loading && (
        <svg
          className="w-5 h-5 text-black animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}
      <span>{loading ? 'Please wait...' : children}</span>
    </button>
  );
};

import { HTMLMotionProps, motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import Spinner from './Spinner';

type ButtonVariant =
  | 'primary'
  | 'secondary-dark'
  | 'secondary-light'
  | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends HTMLMotionProps<'button'> {
  isLoading?: boolean;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = ({
  isLoading = false,
  children,
  className = '',
  disabled = false,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) => {
  const baseClasses = 'w-full font-medium rounded-xl transition';
  const { t } = useTranslation();

  const sizeClasses = (() => {
    switch (size) {
      case 'sm':
        return 'py-1.5 px-3 text-xs sm:text-sm';
      case 'lg':
        return 'py-3 px-5 text-base sm:text-lg';
      case 'md':
      default:
        return 'py-2 px-4 text-sm sm:text-base';
    }
  })();

  const variantClasses = (() => {
    switch (variant) {
      case 'primary':
        return `text-white ${
          isLoading || disabled
            ? 'bg-primary/50 cursor-not-allowed'
            : 'bg-primary cursor-pointer'
        }`;
      case 'secondary-dark':
        return 'text-white border border-white disabled:opacity-50 disabled:cursor-not-allowed';
      case 'secondary-light':
        return 'text-white bg-app disabled:opacity-50 disabled:cursor-not-allowed';
      case 'destructive':
        return 'text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed';
    }
  })();

  const shadowColor = (() => {
    switch (variant) {
      case 'primary':
        return 'rgba(153, 8, 0, 0.35)';
      case 'secondary-dark':
        return 'rgba(255, 255, 255, 0.2)';
      case 'secondary-light':
        return 'rgba(0, 0, 0, 0.2)';
      case 'destructive':
        return 'rgba(255, 0, 0, 0.4)';
    }
  })();

  const buttonVariants: Variants = {
    hover: { scale: 1.02, boxShadow: `0 8px 25px ${shadowColor}` },
    tap: { scale: 0.98 },
  };

  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      variants={buttonVariants}
      whileHover={!isDisabled ? 'hover' : undefined}
      whileTap={!isDisabled ? 'tap' : undefined}
      disabled={isDisabled}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Spinner />
          <span>{t('common.loading')}</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;

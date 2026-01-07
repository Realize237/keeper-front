import { HTMLMotionProps, motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type ButtonVariant = 'primary' | 'secondary' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

interface FormButtonProps extends HTMLMotionProps<'button'> {
  isLoading?: boolean;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const FormButton = ({
  isLoading = false,
  children,
  className = '',
  disabled = false,
  variant = 'primary',
  size = 'md',
  ...props
}: FormButtonProps) => {
  const baseClasses = 'w-full font-semibold rounded-full transition';
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
        return `text-black ${
          isLoading || disabled
            ? 'bg-[#8fb103] cursor-not-allowed'
            : 'bg-[#CDFF00] cursor-pointer'
        }`;
      case 'secondary':
        return 'text-white border border-white disabled:opacity-50 disabled:cursor-not-allowed';
      case 'destructive':
        return 'text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed';
    }
  })();

  const shadowColor = (() => {
    switch (variant) {
      case 'primary':
        return 'rgba(205, 255, 0, 0.4)';
      case 'secondary':
        return 'rgba(255, 255, 255, 0.2)';
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
      {isLoading && variant === 'primary' ? t('common.loading') : children}
    </motion.button>
  );
};

export default FormButton;

import React, { forwardRef, useState } from 'react';
import { groupClassNames } from '../../utils';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, type, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="space-y-1 w-full">
        <div
          className={groupClassNames(
            'flex items-center  justify-between bg-surface text-surface-foreground placeholder-muted-foreground rounded-full border transition',
            error ? 'border-danger' : 'border-border',
            'focus-within:border-primary focus-within:ring-2 focus-within:ring-primary',
            className
          )}
        >
          <input
            ref={ref}
            {...props}
            type={
              type === 'password' ? (showPassword ? 'text' : 'password') : type
            }
            className={groupClassNames(
              'w-full p-4 rounded-full outline-none',
              type === 'text'
                ? 'text-center'
                : 'placeholder:text-left text-left '
            )}
          />
          {type === 'password' &&
            (showPassword ? (
              <FiEyeOff
                onClick={() => setShowPassword(false)}
                size={24}
                className="text-surface-foreground cursor-pointer mr-4"
              />
            ) : (
              <FiEye
                size={24}
                onClick={() => setShowPassword(true)}
                className="text-surface-foreground cursor-pointer mr-4"
              />
            ))}
        </div>
        {error && <p className="text-danger text-sm">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

import { motion } from 'framer-motion';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import { useState } from 'react';
import {
  FieldError,
  RegisterOptions,
  UseFormRegister,
  FieldValues,
  Path,
} from 'react-hook-form';

type FormInputProps<FormValues extends FieldValues> = {
  type?: string;
  placeholder: string;
  error?: FieldError | string | null;
  register: UseFormRegister<FormValues>;
  name: Path<FormValues>;
  rules?: RegisterOptions<FormValues>;
  passwordToggle?: boolean;
  disabled?: boolean;
};

export default function FormInput<FormValues extends FieldValues>({
  type = 'text',
  placeholder,
  error,
  register,
  name,
  rules,
  passwordToggle = false,
  disabled = false,
}: FormInputProps<FormValues>) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    passwordToggle && type === 'password'
      ? showPassword
        ? 'text'
        : 'password'
      : type;

  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative w-full">
        <input
          {...register(name, rules)}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full bg-surface text-white placeholder-gray-500 rounded-xl py-3 px-5 focus:outline-none focus:ring-2 focus:ring-primary pr-12 ${
            error ? 'border border-red-500' : ''
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />

        {passwordToggle && !disabled && (
          <motion.button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <GoEye size={20} /> : <GoEyeClosed size={20} />}
          </motion.button>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-1">
          {typeof error === 'string' ? error : error.message}
        </p>
      )}
    </motion.div>
  );
}

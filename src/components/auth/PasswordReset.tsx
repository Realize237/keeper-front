import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdClose } from 'react-icons/md';

const resetSchema = z
  .object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine(
    (formValues) => formValues.newPassword === formValues.confirmPassword,
    {
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    }
  );

interface PasswordResetProp {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newPassword: string) => void;
  isSubmitting: boolean;
}

export default function PasswordReset({
  onSubmit,
  onClose,
  isOpen,
  isSubmitting = false,
}: PasswordResetProp) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetSchema),
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
                    bg-black/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-[#171717] p-6 rounded-xl shadow-xl w-4/12 space-y-4"
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white"
        >
          <MdClose size={22} />
        </button>

        <h2 className="text-white text-xl font-semibold">
          Create New Password
        </h2>
        <p className="text-gray-400 text-sm">
          Choose a strong password for your account.
        </p>

        <form
          onSubmit={handleSubmit((d) => onSubmit(d.newPassword))}
          className="space-y-4"
        >
          <Input
            type="password"
            placeholder="New password"
            className="pr-4"
            {...register('newPassword')}
            error={errors.newPassword?.message}
          />

          <Input
            type="password"
            className="pr-4"
            placeholder="Confirm password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />

          <Button loading={isSubmitting} className="w-full">
            Reset Password
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

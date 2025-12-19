import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdClose } from 'react-icons/md';

const passwordResetRequestSchema = z.object({
  email: z.email(),
});

interface PasswordResetRequestProps {
  onSubmit: (email: string) => void;
  isOpen: boolean;
  onClose: () => void;
  isSubmitting: boolean;
}

export default function PasswordResetRequest({
  onSubmit,
  isOpen,
  onClose,
  isSubmitting = false
}: PasswordResetRequestProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordResetRequestSchema),
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
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white"
        >
          <MdClose size={22} />
        </button>

        <h2 className="text-white text-xl font-semibold">Password Reset</h2>

        <p className="text-gray-400 text-sm">
          Enter your email to receive a reset code.
        </p>

        <form
          onSubmit={handleSubmit((formValues) => onSubmit(formValues.email))}
          className="space-y-4"
        >
          <Input
            placeholder="Email"
            type='email'
            {...register('email')}
            error={errors.email?.message?.toString()}
          />

          <Button loading={isSubmitting} className="w-full">
            Send Code
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

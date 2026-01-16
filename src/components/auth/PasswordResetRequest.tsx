import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdClose } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import FormButton from '../ui/FormButton';

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
  isSubmitting = false,
}: PasswordResetRequestProps) {
  const { t } = useTranslation();
  const passwordResetRequestSchema = z.object({
    email: z.string().email(t('auth.password_reset_request.validation.email')),
  });

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
          aria-label={t('common.close')}
        >
          <MdClose size={22} />
        </button>

        <h2 className="text-white text-xl font-semibold">
          {t('auth.password_reset_request.title')}
        </h2>

        <p className="text-gray-400 text-sm">
          {t('auth.password_reset_request.description')}
        </p>

        <form
          onSubmit={handleSubmit((formValues) => onSubmit(formValues.email))}
          className="space-y-4"
        >
          <Input
            placeholder={t('auth.password_reset_request.email_placeholder')}
            type="email"
            {...register('email')}
            error={errors.email?.message?.toString()}
          />

          <FormButton
            size="lg"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="w-full"
          >
            {t('auth.password_reset_request.send_code')}
          </FormButton>
        </form>
      </motion.div>
    </div>
  );
}

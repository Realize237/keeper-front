import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdClose } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { PASSWORD_RULES } from '../../constants/validation/patterns';

export default function PasswordReset({
  onSubmit,
  onClose,
  isOpen,
  isSubmitting = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newPassword: string) => void;
  isSubmitting: boolean;
}) {
  const { t } = useTranslation();

  const resetSchema = z
    .object({
      newPassword: z
        .string()
        .min(
          PASSWORD_RULES.MIN_LENGTH,
          t('auth.validation.password.min', {
            count: PASSWORD_RULES.MIN_LENGTH,
          })
        )
        .regex(
          PASSWORD_RULES.REGEX,
          t('auth.password_reset.validation.password_pattern')
        ),

      confirmPassword: z.string(),
    })
    .refine(
      (formValues) => formValues.newPassword === formValues.confirmPassword,
      {
        path: ['confirmPassword'],
        message: t('auth.password_reset.validation.passwords_match'),
      }
    );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetSchema),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
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
          {t('auth.password_reset.title')}
        </h2>
        <p className="text-gray-400 text-sm">
          {t('auth.password_reset.description')}
        </p>

        <form
          onSubmit={handleSubmit((d) => onSubmit(d.newPassword))}
          className="space-y-4"
        >
          <Input
            type="password"
            placeholder={t('auth.password_reset.fields.new_password')}
            className="pr-4"
            {...register('newPassword')}
            error={errors.newPassword?.message}
          />

          <Input
            type="password"
            placeholder={t('auth.password_reset.fields.confirm_password')}
            className="pr-4"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />

          <Button loading={isSubmitting} className="w-full">
            {t('auth.password_reset.actions.submit')}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

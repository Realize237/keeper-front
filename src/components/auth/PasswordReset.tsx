import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { PASSWORD_RULES } from '../../constants/validation/patterns';
import FormButton from '../ui/Button';
import Modal from '../ui/Modal';
import FormInput from '../ui/FormInput';

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
        .regex(PASSWORD_RULES.REGEX, t('auth.validation.password.pattern')),
      confirmPassword: z.string(),
    })
    .refine((values) => values.newPassword === values.confirmPassword, {
      path: ['confirmPassword'],
      message: t('auth.password_reset.validation.passwords_match'),
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetSchema),
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('auth.password_reset.title')}
      width="max-w-md"
    >
      <p className="text-surface-foreground text-sm mb-4">
        {t('auth.password_reset.description')}
      </p>

      <form
        onSubmit={handleSubmit((d) => onSubmit(d.newPassword))}
        className="space-y-4"
      >
        <FormInput
          name="newPassword"
          placeholder={t('auth.password_reset.fields.new_password')}
          register={register}
          passwordToggle={true}
          error={errors.newPassword?.message}
        />

        <FormInput
          name="confirmPassword"
          type="password"
          placeholder={t('change_password.fields.confirm_password')}
          register={register}
          passwordToggle={true}
          error={errors.confirmPassword}
        />

        <FormButton isLoading={isSubmitting} disabled={isSubmitting} size="lg">
          {t('auth.password_reset.actions.submit')}
        </FormButton>
      </form>
    </Modal>
  );
}

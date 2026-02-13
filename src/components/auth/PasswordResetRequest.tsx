import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import FormButton from '../ui/Button';
import Modal from '../ui/Modal';
import FormInput from '../ui/FormInput';
import { EMAIL_REGEX } from '../../constants/validation/patterns';

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('auth.password_reset_request.title')}
      width="max-w-md"
    >
      <p className="text-surface-foreground text-sm mb-4">
        {t('auth.password_reset_request.description')}
      </p>

      <form
        onSubmit={handleSubmit((values) => onSubmit(values.email))}
        className="space-y-4"
      >
        <FormInput
          name="email"
          placeholder={t('auth.password_reset_request.email_placeholder')}
          register={register}
          error={errors.email}
          rules={{
            required: t('profile.edit.fields.email.required'),
            pattern: {
              value: EMAIL_REGEX,
              message: t('auth.validation.email'),
            },
          }}
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
    </Modal>
  );
}

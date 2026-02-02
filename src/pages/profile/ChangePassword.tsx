import { useEffect, useState } from 'react';
import { useUser } from '../../hooks/useUsers';
import FormInput from '../../components/ui/FormInput';
import FormButton from '../../components/ui/Button';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IEmailPasswordInput } from '../../interfaces/users';
import {
  useChangeUserPassword,
  useSendSetPasswordEmail,
} from '../../hooks/useUsers';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { PASSWORD_RULES } from '../../constants/validation/patterns';

const ChangePassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUser();
  const [formError, setFormError] = useState<string | null>(null);
  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangeUserPassword();
  const { mutate: sendSetPasswordEmail, isPending: isSendingEmail } =
    useSendSetPasswordEmail();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IEmailPasswordInput>();

  const newPassword = watch('newPassword');

  const onSubmit = async (data: IEmailPasswordInput) => {
    changePassword(
      { data },
      {
        onSuccess: () => {
          toast.success(t('change_password.success.change_password'));
          reset();
        },
        onError: (error: Error & { code?: string }) => {
          const code = error.code;
          if (code === 'INCORRECT_PASSWORD' || code === 'USER_NOT_FOUND') {
            setFormError(t(`change_password.errors.${code}`, error.message));
          } else {
            toast.error(error.message || t('change_password.errors.generic'));
          }
        },
      }
    );
  };

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (formError && name === 'oldPassword') {
        setFormError(null);
      }
      return () => subscription.unsubscribe();
    });
  }, [watch, formError]);

  if (!user) return null;

  return (
    <div className="text-white w-11/12 mx-auto py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 cursor-pointer flex items-center justify-center rounded-full hover:bg-white/10 transition"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <h3 className="text-xl text-center font-bold ml-4 capitalize">
        {t('change_password.title')}
      </h3>

      {user.authType === 'EmailAndPassword' && (
        <p className="max-w-md mx-auto text-gray-300 text-sm mb-6 text-center">
          {t('change_password.description')}
        </p>
      )}
      {user.authType === 'EmailAndPassword' ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto space-y-4"
        >
          <FormInput
            name="oldPassword"
            type="password"
            placeholder={t('change_password.fields.current_password')}
            passwordToggle={true}
            register={register}
            rules={{
              required: t('change_password.validation.current_required'),
            }}
            error={errors.oldPassword || formError}
          />

          <FormInput
            name="newPassword"
            type="password"
            placeholder={t('change_password.fields.new_password')}
            register={register}
            passwordToggle={true}
            rules={{
              required: t('change_password.validation.new_required'),
              minLength: {
                value: PASSWORD_RULES.MIN_LENGTH,
                message: t('auth.validation.password.min', {
                  count: PASSWORD_RULES.MIN_LENGTH,
                }),
              },
              pattern: {
                value: PASSWORD_RULES.REGEX,
                message: t('auth.validation.password.pattern'),
              },
            }}
            error={errors.newPassword}
          />
          <FormInput
            name="confirmPassword"
            type="password"
            placeholder={t('change_password.fields.confirm_password')}
            register={register}
            passwordToggle={true}
            rules={{
              required: t('change_password.validation.confirm_required'),
              validate: (value) =>
                value === newPassword || t('change_password.validation.match'),
            }}
            error={errors.confirmPassword}
          />

          <div className="flex gap-10">
            <FormButton
              type="button"
              variant="secondary-dark"
              onClick={() => navigate(-1)}
            >
              {t('common.cancel')}
            </FormButton>
            <FormButton type="submit" disabled={isChangingPassword}>
              {isChangingPassword
                ? t('change_password.actions.updating')
                : t('change_password.actions.update')}
            </FormButton>
          </div>
        </form>
      ) : (
        <div className="text-white w-full px-6 py-12">
          <motion.div
            className="max-w-md mx-auto space-y-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <p className="text-sm leading-relaxed text-white/70 text-center">
              {t('change_password.googleInfo')}
            </p>

            <FormButton
              onClick={() => {
                sendSetPasswordEmail(
                  {
                    data: { name: user.name, email: user.email },
                  },
                  {
                    onSuccess: () => {
                      toast.success(t('change_password.success.send_email'));
                      navigate(-1);
                    },
                    onError: (error: Error) => {
                      toast.error(
                        error.message || t('change_password.errors.send_email')
                      );
                    },
                  }
                );
              }}
              disabled={isSendingEmail}
              className="w-full"
            >
              {isSendingEmail
                ? t('change_password.actions.sending')
                : t('change_password.actions.send_email')}
            </FormButton>

            <p className="text-xs text-white/40 text-center">
              {t('change_password.helper')}
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import FormInput from '../../components/ui/FormInput';
import FormButton from '../../components/ui/FormButton';
import { ISetPasswordInput } from '../../interfaces/users';
import { useLocation } from 'react-router-dom';

import { useSetPassword } from '../../hooks/useUsers';
import { useTranslation } from 'react-i18next';

const SetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: setPassword, isPending } = useSetPassword();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token') || '';

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ISetPasswordInput>();

  const onSubmit = (data: ISetPasswordInput) => {
    if (!token) {
      toast.error(t('set_password.errors.invalid_token'));
      return;
    }
    setPassword(
      { data: { ...data, token } },
      {
        onSuccess: () => {
          toast.success(t('set_password.success'));
          reset();
          navigate('/login');
        },
        onError: (error: Error) => {
          toast.error(error.message || t('set_password.errors.failed'));
        },
      }
    );
  };

  return (
    <div className="text-white w-11/12 mx-auto py-8">
      <div className="flex items-center mb-6"></div>
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-xl font-bold ml-4">{t('set_password.title')}</h3>
        <p className=" text-gray-300 text-sm my-6 text-center">
          {t('set_password.subtitle')}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto space-y-4"
      >
        <FormInput
          name="newPassword"
          type="password"
          placeholder={t('set_password.fields.new_password.placeholder')}
          register={register}
          passwordToggle={true}
          rules={{
            required: t('set_password.fields.new_password.required'),
            minLength: {
              value: 8,
              message: t('set_password.fields.new_password.min_length'),
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
              message: t('set_password.fields..new_password.pattern'),
            },
          }}
          error={errors.newPassword}
        />

        <FormInput
          name="confirmPassword"
          type="password"
          placeholder={t('set_password.fields.confirm_password.placeholder')}
          register={register}
          passwordToggle={true}
          rules={{
            required: t('set_password.fields.confirm_password.required'),
            validate: (value) =>
              value === getValues('newPassword') ||
              t('set_password.fields.confirm_password.mismatch'),
          }}
          error={errors.confirmPassword}
        />

        <FormButton type="submit" disabled={isPending}>
          {isPending
            ? t('set_password.actions.setting')
            : t('set_password.actions.submit')}
        </FormButton>
      </form>
    </div>
  );
};

export default SetPassword;

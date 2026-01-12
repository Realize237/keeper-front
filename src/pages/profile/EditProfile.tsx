import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getAvatarInitials } from '../../utils';
import { useUser } from '../../hooks/useUsers';
import FormInput from '../../components/ui/FormInput';
import { useForm } from 'react-hook-form';
import { UserInput } from '../../interfaces/users';
import FormButton from '../../components/ui/FormButton';
import { useUpdateUser } from '../../hooks/useUsers';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EMAIL_REGEX, NAME_RULES } from '../../constants/validation/patterns';

const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { t } = useTranslation();
  const { mutate: updateUser } = useUpdateUser();
  const [emailError] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    getValues,
  } = useForm<UserInput>({
    mode: 'onBlur',
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const onSubmit = () => {
    const values = getValues();
    const changedFields = {
      name: values.name !== user?.name ? values.name : undefined,
    };

    const filteredFields = Object.fromEntries(
      Object.entries(changedFields).filter(([, value]) => value !== undefined)
    );

    if (Object.keys(filteredFields).length === 0) return;

    updateUser(
      { user: changedFields, id: Number(user?.id) },
      {
        onSuccess: () => toast.success(t('profile.edit.success')),
        onError: (error: Error) => {
          toast.error(error.message || t('profile.edit.errors.generic'));
        },
      }
    );
  };
  return (
    <div className="text-white w-11/12 mx-auto py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-700 transition"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-bold ml-4">{t('profile.edit.title')}</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="flex justify-center  ">
          {user?.photo ? (
            <img
              src={user.photo}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full"
            />
          ) : (
            <div className="w-24 h-24 text-xl flex items-center justify-center rounded-full bg-[#CDFF00] text-black font-bold">
              {getAvatarInitials(user?.name || '')}
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-4 mt-4">
          <FormInput
            name="name"
            placeholder={t('profile.edit.fields.name.placeholder')}
            register={register}
            rules={{
              required: t('profile.edit.fields.name.required'),
              minLength: {
                value: NAME_RULES.MIN_LENGTH,
                message: t('auth.validation.name.min', {
                  count: NAME_RULES.MIN_LENGTH,
                }),
              },
              pattern: {
                value: NAME_RULES.REGEX,
                message: t('auth.validation.name.pattern'),
              },
            }}
            error={errors.name}
          />

          <FormInput
            name="email"
            placeholder={t('profile.edit.fields.email.placeholder')}
            register={register}
            disabled={true}
            error={errors.email || emailError}
            rules={{
              required: t('profile.edit.fields.email.required'),
              pattern: {
                value: EMAIL_REGEX,
                message: t('auth.validation.email'),
              },
            }}
          />

          <div className="flex gap-10">
            <FormButton
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              {t('common.cancel')}
            </FormButton>
            <FormButton disabled={!isDirty} type="submit">
              {t('common.save')}
            </FormButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

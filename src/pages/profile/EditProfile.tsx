import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUsers';
import FormInput from '../../components/ui/FormInput';
import { useForm, Controller } from 'react-hook-form';
import { UserInput } from '../../interfaces/users';
import FormButton from '../../components/ui/Button';
import { useUpdateUser } from '../../hooks/useUsers';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { EMAIL_REGEX, NAME_RULES } from '../../constants/validation/patterns';
import { PhoneInput } from '../../components/auth/PhoneInput';
import { countries, getCountryByCode } from '../../constants/countries';
import { Country } from '../../interfaces';
import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from 'libphonenumber-js';
import { Avatar } from '../../components/ui/Avatar';
import { useState } from 'react';

const EditProfile = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { t } = useTranslation();
  const { mutate: updateUser, isPending } = useUpdateUser();

  const getInitialPhoneData = () => {
    if (!user?.phone) {
      return {
        phone: '',
        country: countries.find((c) => c.code === 'FR') || countries[0],
      };
    }

    try {
      const parsed = parsePhoneNumberFromString(user.phone);
      if (parsed && parsed.country) {
        const country = getCountryByCode(parsed.country);
        if (country) {
          const localNumber = user.phone.replace(country.dialCode, '').trim();
          return {
            phone: localNumber,
            country: country,
          };
        }
      }
    } catch {
      // Ignore parsing errors and fall back to default behavior
    }

    return {
      phone: user.phone,
      country: countries.find((c) => c.code === 'FR') || countries[0],
    };
  };

  const initialPhoneData = getInitialPhoneData();
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    initialPhoneData.country
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    getValues,
    control,
  } = useForm<UserInput>({
    mode: 'onBlur',
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: initialPhoneData.phone,
    },
  });

  const onSubmit = () => {
    const values = getValues();

    const fullPhoneNumber = values.phone?.trim()
      ? selectedCountry.dialCode + values.phone.trim()
      : '';

    const changedFields = {
      name: values.name !== user?.name ? values.name : undefined,
      phone: fullPhoneNumber !== user?.phone ? fullPhoneNumber : undefined,
    };

    const filteredFields = Object.fromEntries(
      Object.entries(changedFields).filter(([, value]) => value !== undefined)
    );

    if (Object.keys(filteredFields).length === 0) return;

    updateUser(
      { user: filteredFields, id: Number(user?.id) },
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
          <Avatar size="3xl" name={user?.name} src={user?.photo ?? ''} />
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
            error={errors.email}
            rules={{
              required: t('profile.edit.fields.email.required'),
              pattern: {
                value: EMAIL_REGEX,
                message: t('auth.validation.email'),
              },
            }}
          />

          <Controller
            name="phone"
            control={control}
            rules={{
              required: t('auth.validation.required', {
                field: t('auth.fields.phone'),
              }),
              validate: (value) => {
                if (!value || !value.trim()) {
                  return t('auth.validation.required', {
                    field: t('auth.fields.phone'),
                  });
                }
                const fullPhoneNumber = selectedCountry.dialCode + value.trim();
                return (
                  isValidPhoneNumber(fullPhoneNumber) ||
                  t('auth.validation.phone')
                );
              },
            }}
            render={({ field, fieldState }) => (
              <PhoneInput
                value={field.value || ''}
                onChange={(value) => field.onChange(value)}
                selectedCountry={selectedCountry}
                onCountryChange={setSelectedCountry}
                error={fieldState.error?.message}
                required={true}
              />
            )}
          />

          <div className="flex gap-10">
            <FormButton
              type="button"
              variant="secondary-dark"
              onClick={() => navigate(-1)}
            >
              {t('common.cancel')}
            </FormButton>
            <FormButton
              disabled={!isDirty || isPending}
              isLoading={isPending}
              type="submit"
            >
              {t('common.save')}
            </FormButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

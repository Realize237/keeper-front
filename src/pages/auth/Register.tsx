import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { env } from '../../utils/env';
import { useCreateUser } from '../../hooks/useUsers';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { isValidPhoneNumber } from 'libphonenumber-js';
import {
  EMAIL_REGEX,
  NAME_RULES,
  PASSWORD_RULES,
} from '../../constants/validation/patterns';
import FormButton from '../../components/ui/Button';
import { usePersistentCountdown } from '../../hooks/usePersistentCountDown';
import AuthHeader from '../../components/auth/AuthHeader';
import FormInput from '../../components/ui/FormInput';
import { PATHS } from '../../routes/paths';
import { PhoneInput } from '../../components/auth/PhoneInput';
import { countries } from '../../constants/countries';
import { Country } from '../../interfaces';

export default function Register() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries.find((c) => c.code === 'FR') || countries[0]
  );
  const { mutate, isPending } = useCreateUser();
  const privacyCheckboxRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    control,
  } = useForm({
    mode: 'onBlur',

    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptedPrivacyPolicy: false,
    },
  });

  const countdownMinutes = Number(env.VERIFY_EMAIL_TIMER);

  const { reset: resetCountDown } = usePersistentCountdown(
    'verify_email_timer',
    {
      minutes: countdownMinutes,
    }
  );

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (emailError && name === 'email') {
        setEmailError(null);
      }
      return () => subscription.unsubscribe();
    });
  }, [watch, emailError]);

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
  };

  const onSubmit = (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    acceptedPrivacyPolicy: boolean;
  }) => {
    const fullPhoneNumber = selectedCountry.dialCode + data.phone;

    if (!data.acceptedPrivacyPolicy) {
      toast.error(t('auth.register.errors.accept_privacy_required'));
      return;
    }

    mutate(
      {
        name: data.name,
        email: data.email,
        phone: fullPhoneNumber,
        password: data.password,
        acceptedPrivacyPolicy: data.acceptedPrivacyPolicy,
      },
      {
        onError: (error: Error & { code?: string }) => {
          const code = error.code;
          if (code === 'EMAIL_ALREADY_EXISTS') {
            setEmailError(t(`auth.register.errors.${code}`));
            return;
          }
          if (code === 'EXISTING_UNVERIFIED_USER') {
            resetCountDown();
            navigate(PATHS.AUTH.CHECK_EMAIL, {
              state: {
                email: data.email,
                reason: 'existing-unverified',
                message: error.message,
              },
            });
            return;
          }
          toast.error(
            error.message || t('auth.register.errors.UNEXPECTED_ERROR')
          );
        },
        onSuccess: () => {
          resetCountDown();
          navigate(PATHS.AUTH.CHECK_EMAIL, {
            state: { email: data.email, reason: 'new-signup' },
          });
        },
      }
    );
  };

  const handleGoogleSignup = () => {
    if (!getValues('acceptedPrivacyPolicy')) {
      toast.error(t('auth.register.errors.accept_privacy_required'));

      if (privacyCheckboxRef.current) {
        privacyCheckboxRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });

        privacyCheckboxRef.current.classList.add(
          'ring-2',
          'ring-white',
          'ring-opacity-70'
        );
        setTimeout(() => {
          privacyCheckboxRef.current?.classList.remove(
            'ring-2',
            'ring-white',
            'ring-opacity-70'
          );
        }, 2200);
        privacyCheckboxRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });

        const input = privacyCheckboxRef.current.querySelector(
          'input[type="checkbox"]'
        );
        if (input instanceof HTMLInputElement) {
          input.focus();
        }
      }
      return;
    }
    window.location.href = env.GOOGLE_CALLBACK_URL;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };
  const socialButtonVariants = {
    hover: {
      y: -4,
      borderColor: '#990800',
      boxShadow: '0 8px 20px rgba(153, 8, 0, 0.35)',
    },
    tap: { y: -2 },
  };

  return (
    <div className=" bg-app min-h-screen ">
      <AuthHeader />
      <motion.div
        className="px-4 mt-16 max-w-md mx-auto flex flex-col items-center justify-center py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-xl md:text-2xl font-normal text-white mb-2"
        >
          {t('auth.register.title')}
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-center text-xs md:text-sm mb-8"
        >
          {t('auth.register.subtitle')}
        </motion.p>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full"
          variants={itemVariants}
        >
          <motion.div className="mb-4" variants={itemVariants}>
            <FormInput
              name="name"
              placeholder={t('auth.register.fields.name.label')}
              register={register}
              rules={{
                required: t('auth.validation.required', {
                  field: t('auth.fields.name'),
                }),
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
          </motion.div>

          <motion.div className="mb-4" variants={itemVariants}>
            <FormInput
              name="email"
              placeholder={t('auth.register.fields.email.label')}
              register={register}
              error={errors.email || emailError}
              rules={{
                required: t('auth.validation.required', {
                  field: t('auth.fields.email'),
                }),
                pattern: {
                  value: EMAIL_REGEX,
                  message: t('auth.validation.email'),
                },
              }}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs mt-1"
              >
                {errors.email.message}
              </motion.p>
            )}
            {emailError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs mt-1"
              >
                {emailError}
              </motion.p>
            )}
          </motion.div>

          <motion.div className="mb-4" variants={itemVariants}>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: t('auth.validation.required', {
                  field: t('auth.fields.phone'),
                }),
                validate: (value) => {
                  if (!value)
                    return t('auth.validation.required', {
                      field: t('auth.fields.phone'),
                    });
                  const fullPhoneNumber = selectedCountry.dialCode + value;
                  return (
                    isValidPhoneNumber(fullPhoneNumber) ||
                    t('auth.validation.phone')
                  );
                },
              }}
              render={({ field, fieldState }) => (
                <PhoneInput
                  value={field.value || ''}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  selectedCountry={selectedCountry}
                  onCountryChange={handleCountryChange}
                  error={fieldState.error?.message}
                  required={true}
                />
              )}
            />
          </motion.div>

          <motion.div className="mb-4" variants={itemVariants}>
            <FormInput
              name="password"
              type="password"
              passwordToggle={true}
              placeholder={t('auth.register.fields.password.label')}
              register={register}
              rules={{
                required: t('auth.validation.required', {
                  field: t('auth.fields.password'),
                }),
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
              error={errors.password}
            />
          </motion.div>

          <motion.div className="mb-6" variants={itemVariants}>
            <FormInput
              name="confirmPassword"
              type="password"
              placeholder={t('change_password.fields.confirm_password')}
              register={register}
              passwordToggle={true}
              rules={{
                required: t('auth.register.fields.confirm_password.required'),
                validate: (value) => {
                  const password = getValues('password');
                  return (
                    value === password ||
                    t('auth.register.fields.confirm_password.match')
                  );
                },
              }}
              error={errors.confirmPassword}
            />
          </motion.div>

          <motion.div
            ref={privacyCheckboxRef}
            className="mb-6 w-full px-1"
            variants={itemVariants}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  id="acceptPrivacy"
                  {...register('acceptedPrivacyPolicy', {
                    required: t('auth.register.errors.accept_privacy_required'),
                  })}
                  className="peer sr-only"
                />
                <div
                  className={`
        w-6 h-6 rounded-md border transition-all duration-200 flex items-center justify-center
        ${
          errors.acceptedPrivacyPolicy
            ? 'border-red-500 bg-red-950/30'
            : 'border-gray-600 bg-[#2a2a2a]'
        }
        peer-checked:bg-primary peer-checked:border-white]
        peer-checked:[&>svg]:opacity-100 peer-checked:[&>svg]:scale-100
      `}
                >
                  <svg
                    className="w-4 h-4 text-white opacity-0 scale-75 transition-all duration-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <span className="text-gray-400 text-sm">
                {t('auth.register.legal.iAccept')}{' '}
                <Link
                  to={PATHS.LEGAL.PRIVACY.full}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deep-teal underline transition"
                >
                  {t('auth.register.legal.privacy')}
                </Link>{' '}
                {t('auth.register.legal.and')}{' '}
                <Link
                  to={PATHS.LEGAL.TERMS.full}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deep-teal underline transition"
                >
                  {t('auth.register.legal.terms')}
                </Link>
              </span>
            </label>

            {errors.acceptedPrivacyPolicy && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs mt-2 ml-8"
              >
                {errors.acceptedPrivacyPolicy.message}
              </motion.p>
            )}
          </motion.div>

          <FormButton
            type="submit"
            isLoading={isPending}
            size="lg"
            className="mb-4"
            disabled={isPending}
          >
            {isPending
              ? t('auth.register.actions.loading')
              : t('auth.register.actions.submit')}
          </FormButton>
        </motion.form>

        <motion.div
          className="flex items-center w-full mb-6"
          variants={itemVariants}
        >
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-3 text-white text-sm">
            {t('auth.register.divider')}
          </span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </motion.div>

        <motion.div
          className="flex gap-4 w-full mb-8"
          variants={containerVariants}
        >
          <motion.button
            className="flex-1 border border-gray-500 rounded-lg py-3 flex items-center justify-center hover:bg-gray-800/50"
            variants={socialButtonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleGoogleSignup()}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          </motion.button>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-xs text-center"
        >
          {t('auth.register.footer.text')}{' '}
          <Link
            to={PATHS.AUTH.LOGIN}
            className="text-white transition duration-300 hover:opacity-80"
          >
            {t('auth.register.footer.login')}
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

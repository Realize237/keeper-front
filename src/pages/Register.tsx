import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import { env } from '../utils/env';
import { useCreateUser } from '../hooks/useUsers';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const { mutate, isPending } = useCreateUser();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError(null);
    return e.target.value;
  };

  const password = watch('password');

  const onSubmit = (data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    mutate(
      { name: data.name, email: data.email, password: data.password },
      {
        onError: (error) => {
          const code = error.code;
          if (code) {
            setEmailError(t(`register.errors.${code}`));
            return;
          }

          toast.error(error.message || t('register.errors.UNEXPECTED_ERROR'));
        },
        onSuccess: () => {
          navigate('/login');
        },
      }
    );
  };

  const handleGoogleSignup = () => {
    window.location.href = env.GOOGLE_CALLBACK_URL;
  };

  const getInputClass = (fieldName: string) => {
    const baseClass =
      'w-full bg-[#2a2a2a] text-white placeholder-gray-500 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-[#CDFF00] transition';
    return errors[fieldName as keyof typeof errors]
      ? `${baseClass} border-2 border-red-500 shadow-lg shadow-red-500/30`
      : baseClass;
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

  const buttonVariants = {
    hover: { scale: 1.02, boxShadow: '0 8px 25px rgba(205, 255, 0, 0.4)' },
    tap: { scale: 0.98 },
  };

  const socialButtonVariants = {
    hover: {
      y: -4,
      borderColor: '#CDFF00',
      boxShadow: '0 8px 20px rgba(205, 255, 0, 0.2)',
    },
    tap: { y: -2 },
  };

  const eyeIconVariants = {
    hover: { scale: 1.2 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="w-11/12 max-w-md mx-auto flex flex-col items-center justify-center py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        variants={itemVariants}
        className="text-2xl md:text-4xl font-normal text-white mb-2"
      >
        {t('auth.register.title')}
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-gray-400 text-xs md:text-sm mb-8"
      >
        {t('auth.register.subtitle')}{' '}
        <Link
          to={'/login'}
          className="text-[#CDFF00] hover:opacity-80 transition duration-300 hover:underline"
        >
          {t('auth.register.login')}
        </Link>
      </motion.p>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
        variants={itemVariants}
      >
        <motion.div className="mb-4" variants={itemVariants}>
          <input
            type="text"
            placeholder={t('auth.register.fields.name.label')}
            {...register('name', {
              required: t('auth.register.fields.name.required'),
              minLength: {
                value: 2,
                message: t('auth.register.fields.name.min'),
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: t('auth.register.fields.name.pattern'),
              },
            })}
            className={getInputClass('name')}
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.name.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div className="mb-4" variants={itemVariants}>
          <input
            type="email"
            placeholder={t('auth.register.fields.email.label')}
            {...register('email', {
              required: t('auth.register.fields.email.required'),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t('auth.register.fields.email.pattern'),
              },
              onChange: handleEmailChange,
            })}
            className={getInputClass('email')}
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
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={t('auth.register.fields.password.label')}
              {...register('password', {
                required: t('auth.register.fields.password.required'),
                minLength: {
                  value: 8,
                  message: t('auth.register.fields.password.min'),
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: t('auth.register.fields.password.pattern'),
                },
              })}
              className={`${getInputClass('password')} pr-12`}
            />
            <motion.button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#CDFF00]"
              type="button"
              variants={eyeIconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {showPassword ? <GoEye size={20} /> : <GoEyeClosed size={20} />}
            </motion.button>
          </div>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.password.message}
            </motion.p>
          )}
        </motion.div>

        <motion.div className="mb-6" variants={itemVariants}>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={t('auth.register.fields.confirm_password.label')}
              {...register('confirmPassword', {
                required: t('auth.register.fields.confirm_password.required'),
                validate: (value) =>
                  value === password ||
                  t('auth.register.fields.confirm_password.match'),
              })}
              className={`${getInputClass('confirmPassword')} pr-12`}
            />
            <motion.button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#CDFF00]"
              type="button"
              variants={eyeIconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {showConfirmPassword ? (
                <GoEye size={20} />
              ) : (
                <GoEyeClosed size={20} />
              )}
            </motion.button>
          </div>
          {errors.confirmPassword && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1"
            >
              {errors.confirmPassword.message}
            </motion.p>
          )}
        </motion.div>

        <motion.button
          type="submit"
          className={`w-full ${
            isPending
              ? 'bg-[#8fb103] cursor-not-allowed'
              : 'bg-[#CDFF00] cursor-pointer'
          } text-black font-semibold rounded-full py-3 px-5 mb-6 text-lg hover:cursor-pointer`}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          disabled={isPending}
        >
          {isPending
            ? t('auth.register.actions.loading')
            : t('auth.register.actions.submit')}
        </motion.button>
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
        className="text-gray-500 text-xs text-center"
      >
        {t('auth.register.legal.text')}
        <br />
        <a
          href="#"
          className="text-[#CDFF00] transition duration-300 hover:opacity-80 underline"
        >
          {t('auth.register.legal.terms')}
        </a>{' '}
        {t('auth.register.legal.and')}{' '}
        <a
          href="#"
          className="text-[#CDFF00] transition duration-300 hover:opacity-80 underline"
        >
          {t('auth.register.legal.privacy')}
        </a>
      </motion.p>
    </motion.div>
  );
}

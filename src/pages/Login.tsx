import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import { Link, useSearchParams } from 'react-router-dom';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import { IMAGES } from '../assets';
import {
  useLoginUser,
  useRequestPasswordReset,
  useResetPassword,
  useValidateForgotPasswordToken,
} from '../hooks/useUsers';
import { useNavigate } from 'react-router-dom';
import { env } from '../utils/env';
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import {
  FORGOT_PASSWORD_STEPS,
  ForgotPasswordStepsType,
} from '../interfaces/auth';
import PasswordResetRequest from '../components/auth/PasswordResetRequest';
import OTPVerification from '../components/auth/OTPVerification';
import PasswordReset from '../components/auth/PasswordReset';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useLoginUser();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');
  const [email, setEmail] = useState('');
  const requestResetPasswordMutation = useRequestPasswordReset();
  const validateForgotPasswordTokenMutation = useValidateForgotPasswordToken();
  const resetPasswordMutation = useResetPassword();
  const [cookies, setCookies, removeCookie] = useCookies(['rememberMe']);
  const [forgotPasswordStep, setForgotPasswordStep] =
    useState<ForgotPasswordStepsType | null>(null);
  const [accountDisabledError, setAccountDisableError] = useState<
    string | null
  >(null);

  const toastShownRef = useRef(false);

  useEffect(() => {
    if (error && !toastShownRef.current) {
      toastShownRef.current = true;
      toast.error(error);

      const newParams = new URLSearchParams(searchParams);
      newParams.delete('error');
      window.history.replaceState({}, '', `${location.pathname}?${newParams}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  useEffect(() => {
    if (cookies.rememberMe) {
      reset({
        email: cookies.rememberMe.email,
        password: cookies.rememberMe.password,
        rememberMe: cookies.rememberMe.rememberMe,
      });
    }
  }, [cookies, reset]);

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (loginError && (name === 'email' || name === 'password')) {
        setLoginError(null);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, loginError]);

  const onSubmit = (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    if (data.rememberMe) {
      setCookies(
        'rememberMe',
        {
          email: data.email,

          rememberMe: data.rememberMe,
        },
        { path: '/login', maxAge: Number(env.REMEMBER_ME_COOKIE_EXPIRATION) }
      );
    } else {
      removeCookie('rememberMe');
    }

    mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          navigate('/subscriptions', {
            replace: true,
          });
        },
        onError: (error: Error & { code?: string }) => {
          const code = error.code;
          if (code === 'INVALID_CREDENTIALS' || code === 'USER_NOT_FOUND') {
            setLoginError(t(`auth.login.fields.errors.${code}`, error.message));
            return;
          } else if (code === 'ACCOUNT_DISABLED') {
            setAccountDisableError(error.message);
          } else {
            toast.error(
              error.message ?? t('auth.login.fields.errors.UNEXPECTED_ERROR')
            );
          }
        },
      }
    );
  };

  const handleGoogleLogin = () => {
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

  const requestPasswordRequest = useCallback(
    (email: string) => {
      setEmail(email);
      requestResetPasswordMutation.mutate(
        { email },
        {
          onSuccess: () => {
            setForgotPasswordStep(
              FORGOT_PASSWORD_STEPS.OTP as ForgotPasswordStepsType
            );
          },
          onError: (error) => {
            toast.error(
              t('auth.forgot_password.error', { message: error.message })
            );
          },
        }
      );
    },
    [requestResetPasswordMutation, t]
  );

  const validateForgotPasswordToken = useCallback(
    (token: string) => {
      validateForgotPasswordTokenMutation.mutate(
        { email, token },
        {
          onSuccess: () => {
            setForgotPasswordStep(
              FORGOT_PASSWORD_STEPS.PASSWORD_RESET as ForgotPasswordStepsType
            );
          },
          onError: (error) => {
            toast.error(
              t('auth.forgot_password.error', { message: error.message })
            );
          },
        }
      );
    },
    [validateForgotPasswordTokenMutation, email, t]
  );

  const resetPassword = useCallback(
    (newPassword: string) => {
      resetPasswordMutation.mutate(
        { email, newPassword },
        {
          onSuccess: () => {
            toast.success(t('auth.forgot_password.success'));
            setForgotPasswordStep(null);
          },
          onError: (error) => {
            toast.error(`An error occurred: ${error.message}`);
          },
        }
      );
    },
    [resetPasswordMutation, email, t]
  );

  return (
    <div className="flex flex-col  py-8 overflow-hidden">
      <motion.div
        className="w-11/12 max-w-md mx-auto flex flex-col items-center justify-center "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-2xl md:text-4xl font-normal text-white"
        >
          {t('auth.login.title')}
        </motion.h1>
        <motion.span
          variants={itemVariants}
          className="text-xl font-normal text-white mb-8"
        >
          {t('auth.login.subtitle')}
        </motion.span>

        {accountDisabledError && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3"
          >
            <p className="text-sm text-red-300 leading-relaxed text-center">
              {accountDisabledError}
            </p>
          </motion.div>
        )}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full"
          variants={itemVariants}
        >
          <motion.div className="mb-4" variants={itemVariants}>
            <input
              type="email"
              placeholder={t('auth.login.fields.email.placeholder')}
              {...register('email', {
                required: t('auth.login.fields.email.required'),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t('auth.login.fields.email.invalid'),
                },
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
          </motion.div>

          <motion.div className="mb-4" variants={itemVariants}>
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.login.fields.password.placeholder')}
                {...register('password', {
                  required: t('auth.login.fields.password.required'),
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
            {loginError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-xs mt-1"
              >
                {loginError}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between w-full mb-6"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                {...register('rememberMe')}
                className="w-4 h-4 bg-[#2a2a2a] border border-gray-500 rounded cursor-pointer accent-[#CDFF00]"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-gray-400 text-sm cursor-pointer"
              >
                {t('auth.login.rememberMe')}
              </label>
            </div>
            <button
              onClick={() =>
                setForgotPasswordStep(
                  FORGOT_PASSWORD_STEPS.PASSWORD_REQUEST as ForgotPasswordStepsType
                )
              }
              className="text-[#CDFF00] text-sm hover:opacity-80 transition duration-300"
            >
              {t('auth.login.forgot_password')}
            </button>
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
              ? t('auth.login.actions.loading')
              : t('auth.login.actions.submit')}
          </motion.button>
        </motion.form>

        <motion.div
          variants={itemVariants}
          className="w-full flex flex-col items-center mb-4"
        >
          <motion.div
            className="relative w-120 h-48 mb-4"
            variants={containerVariants}
          >
            {/* Avatar 1 - Left */}
            <motion.div
              className="absolute w-16 h-20 flex items-center justify-center"
              style={{
                left: '7%',
                bottom: '40%',
                transform: 'translateY(-20%) rotate(-12deg)',
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={IMAGES.Login1}
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>

            {/* Avatar 2 - Bottom Left */}
            <motion.div
              className="absolute w-16 h-20 flex items-center justify-center"
              style={{
                left: '25%',
                bottom: '30%',
                transform: 'translate(-50%, 50%) rotate(-8deg)',
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={IMAGES.Login2}
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>

            {/* Avatar 3 - Center Bottom */}
            <motion.div
              className="absolute w-16 h-20 flex items-center justify-center"
              style={{
                left: '42%',
                bottom: '22%',
                transform: 'translateX(-50%) rotate(0deg)',
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={IMAGES.Login3}
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>

            {/* Avatar 4 - Bottom Right */}
            <motion.div
              className="absolute w-16 h-20 flex items-center justify-center"
              style={{
                right: '26%',
                bottom: '25%',
                transform: 'translate(50%, 50%) rotate(8deg)',
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={IMAGES.Login4}
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>

            {/* Avatar 5 - Right */}
            <motion.div
              className="absolute w-16 h-20 flex items-center justify-center"
              style={{
                right: '8%',
                bottom: '35%',
                transform: 'translateY(50%) rotate(12deg)',
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={IMAGES.Login5}
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>
          </motion.div>

          {/* Social Login Buttons */}
          <motion.div
            className="flex gap-4 w-full mb-4"
            variants={containerVariants}
          >
            {/* Google */}
            <motion.button
              className="flex-1 border border-gray-500 rounded-lg py-3 flex items-center justify-center hover:bg-gray-800/50"
              variants={socialButtonVariants}
              whileHover="hover"
              whileTap="tap"
              type="button"
              onClick={() => handleGoogleLogin()}
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
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-xs text-center"
        >
          {t('auth.login.footer.text')}{' '}
          <Link
            to={'/'}
            className="text-[#CDFF00] transition duration-300 hover:opacity-80"
          >
            {t('auth.login.footer.signup')}
          </Link>
        </motion.p>
      </motion.div>
      <PasswordResetRequest
        onSubmit={requestPasswordRequest}
        isSubmitting={requestResetPasswordMutation.isPending}
        isOpen={forgotPasswordStep === FORGOT_PASSWORD_STEPS.PASSWORD_REQUEST}
        onClose={() => setForgotPasswordStep(null)}
      />
      <OTPVerification
        onSubmit={validateForgotPasswordToken}
        isSubmitting={requestResetPasswordMutation.isPending}
        isOpen={forgotPasswordStep === FORGOT_PASSWORD_STEPS.OTP}
        onClose={() => setForgotPasswordStep(null)}
        onResend={() => requestPasswordRequest(email)}
      />
      <PasswordReset
        onSubmit={resetPassword}
        isSubmitting={resetPasswordMutation.isPending}
        isOpen={forgotPasswordStep === FORGOT_PASSWORD_STEPS.PASSWORD_RESET}
        onClose={() => setForgotPasswordStep(null)}
      />
    </div>
  );
}

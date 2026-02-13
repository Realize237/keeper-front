import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { usePersistentCountdown } from '../../hooks/usePersistentCountDown';
import { env } from '../../utils/env';
import {
  useResendEmailVerification,
  useVerifyEmail,
} from '../../hooks/useUsers';
import FormButton from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PATHS } from '../../routes/paths';

interface VerificationResponse {
  message: string;
  code: string;
  email?: string;
}

const VerifyEmail = () => {
  const { t } = useTranslation();
  const [uiState, setUiState] = useState<{
    status: 'loading' | 'success' | 'error' | 'idle';
    message: string;
    isEmailVerified: boolean;
  }>({
    status: 'loading',
    message: '',
    isEmailVerified: false,
  });

  const updateUi = useCallback((newValues: Partial<typeof uiState>) => {
    setUiState((prev) => ({ ...prev, ...newValues }));
  }, []);
  const { status, message, isEmailVerified } = uiState;

  const countdownMinutes = Number(env.VERIFY_EMAIL_TIMER);

  const { minutesLeft, remainingSeconds, reset, expired } =
    usePersistentCountdown('verify_email_timer', { minutes: countdownMinutes });

  const navigate = useNavigate();
  const { mutate: verifyEmail, isPending: isVerifying } = useVerifyEmail();
  const { mutate: resendEmail, isPending: isResending } =
    useResendEmailVerification();

  const token = new URLSearchParams(window.location.search).get('token') ?? '';

  useEffect(() => {
    if (!token) return;

    verifyEmail(token, {
      onSuccess: (data: unknown) => {
        const response = data as VerificationResponse;
        if (response.code === 'EMAIL_VERIFIED_SUCCESSFULLY') {
          updateUi({
            status: 'success',
            message: response.message,
            isEmailVerified: true,
          });
        }
        if (response.code === 'EMAIL_ALREADY_VERIFIED') {
          updateUi({
            status: 'success',
            message: response.message,
            isEmailVerified: true,
          });
        }
      },
      onError: (error: Error & { code?: string }) => {
        if (error.code === 'EMAIL_ALREADY_VERIFIED') {
          updateUi({
            isEmailVerified: true,
            status: 'success',
            message: error.message,
          });
        } else {
          updateUi({
            status: 'error',
            message:
              error.message || t('auth.verify_email.verification_failed'),
          });
        }
      },
    });
  }, [token, verifyEmail, t, updateUi]);

  useEffect(() => {
    if (status === 'success' && isEmailVerified) {
      const timeout = setTimeout(() => {
        navigate(PATHS.AUTH.LOGIN, { replace: true });
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [status, isEmailVerified, navigate]);

  const handleResend = () => {
    if (!token) return;

    resendEmail(
      { token },
      {
        onSuccess: () => {
          reset();
          updateUi({
            status: 'loading',
            message: t('auth.verify_email.resend_success'),
          });
        },
        onError: (error: Error & { code?: string }) => {
          const code = error.code;
          if (code === 'EMAIL_ALREADY_VERIFIED') {
            updateUi({
              isEmailVerified: true,
              status: 'success',
              message: error.message,
            });
          } else {
            updateUi({
              status: 'error',
              message: error.message,
            });
          }
        },
      }
    );
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-surface rounded-2xl p-10 text-center shadow-xl"
        >
          <h1 className="text-white text-3xl font-semibold mb-4">
            {t('auth.verify_email.verification_failed')}
          </h1>
          <p className="text-red-500 mb-6">
            {t('auth.verify_email.invalid_link')}
          </p>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-surface rounded-2xl p-10 text-center shadow-xl"
      >
        <AnimatePresence mode="wait">
          {isVerifying && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader text={t('auth.verify_email.verifying')} />
            </motion.div>
          )}

          {!isVerifying && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h1 className="text-white text-3xl font-semibold mb-4">
                {status === 'success' && t('auth.verify_email.email_verified')}
                {status === 'error' &&
                  t('auth.verify_email.verification_failed')}
                {status === 'loading' && t('auth.verify_email.checking_email')}
              </h1>

              <p
                className={`mb-6 ${
                  status === 'error'
                    ? 'text-red-500'
                    : status === 'success' && isEmailVerified
                      ? 'text-green-400'
                      : 'text-gray-300'
                }`}
              >
                {message}
              </p>

              {status === 'loading' && !expired && !isEmailVerified && (
                <div className="mb-6">
                  <p className="text-gray-400 mb-2">
                    {t('auth.verify_email.link_expires_in')}
                  </p>

                  <motion.span
                    key={`${minutesLeft}:${remainingSeconds}`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.25 }}
                    className="text-white text-xl font-semibold"
                  >
                    {minutesLeft}:{remainingSeconds.toString().padStart(2, '0')}
                  </motion.span>
                </div>
              )}

              {status === 'error' && !isEmailVerified && expired && (
                <FormButton
                  size="md"
                  onClick={handleResend}
                  isLoading={isResending}
                  disabled={isResending}
                >
                  {isResending
                    ? t('auth.verify_email.sending')
                    : t('auth.verify_email.resend_email')}
                </FormButton>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;

const Loader = ({ text }: { text: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center gap-4"
  >
    <motion.div
      className="h-10 w-10 rounded-full border-2 border-white/20 border-t-white"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
    />
    <p className="text-gray-300 text-sm">{text}</p>
  </motion.div>
);

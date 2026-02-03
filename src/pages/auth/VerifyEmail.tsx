import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
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

  const updateUi = (newValues: Partial<typeof uiState>) => {
    setUiState((prev) => ({ ...prev, ...newValues }));
  };
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
    verifyEmail(token, {
      onSuccess: () => {
        updateUi({
          status: 'success',
          message: t('auth.verify_email.redirecting_login'),
        });
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
  }, [token, verifyEmail, t]);

  useEffect(() => {
    if (status !== 'success') return;

    const timeout = setTimeout(() => {
      navigate(PATHS.AUTH.LOGIN, { replace: true });
    }, 5000);

    return () => clearTimeout(timeout);
  }, [status, navigate]);

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
            });
          }

          updateUi({
            status: 'error',
            message: error.message,
          });
        },
      }
    );
  };

  if (!token) {
    updateUi({
      status: 'error',
      message: t('auth.verify_email.invalid_link'),
    });
    return;
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-app px-4">
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
                className={`mb-6 ${status === 'error' ? 'text-red-500' : 'text-gray-300'}`}
              >
                {message}
              </p>

              {status === 'loading' && !expired && (
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

              {!isEmailVerified && (status === 'error' || expired) && (
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

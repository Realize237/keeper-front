import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePersistentCountdown } from '../../hooks/usePersistentCountDown';
import { env } from '../../utils/env';
import {
  useResendEmailVerification,
  useVerifyEmail,
} from '../../hooks/useUsers';
import FormButton from '../../components/ui/FormButton';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const VerifyEmail = () => {
  const { t } = useTranslation();

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [message, setMessage] = useState('');

  const countdownSeconds = Number(env.VERIFY_EMAIL_TIMER);

  const { secondsLeft, reset, expired } = usePersistentCountdown(
    'verify_email_timer',
    countdownSeconds
  );

  const navigate = useNavigate();
  const { mutate: verifyEmail, isPending: isVerifying } = useVerifyEmail();
  const { mutate: resendEmail, isPending: isResending } =
    useResendEmailVerification();
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);

  const token = new URLSearchParams(window.location.search).get('token') ?? '';
  const email = new URLSearchParams(window.location.search).get('email') ?? '';

  useEffect(() => {
    verifyEmail(token, {
      onSuccess: () => {
        setStatus('success');
        setMessage(t('auth.verify_email.redirecting_login'));
      },
      onError: (error) => {
        setStatus('error');
        setMessage(error.message);
      },
    });
  }, [token, verifyEmail, t]);

  useEffect(() => {
    if (status !== 'success') return;

    const timeout = setTimeout(() => {
      navigate('/login', { replace: true });
    }, 2000);

    return () => clearTimeout(timeout);
  }, [status, navigate]);

  const handleResend = () => {
    if (!email) return;

    resendEmail(email, {
      onSuccess: () => {
        reset();
        setStatus('loading');
        setMessage(t('auth.verify_email.resend_success'));
      },
      onError: (error: Error & { code?: string }) => {
        const code = error.code;
        if (code === 'EMAIL_ALREADY_VERIFIED') {
          setIsEmailVerified(true);
        }
        setStatus('error');
        setMessage(error.message);
      },
    });
  };

  if (!token) {
    setStatus('error');
    setMessage(t('auth.verify_email.invalid_link'));
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
                    key={secondsLeft}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.25 }}
                    className="text-white text-xl font-semibold"
                  >
                    {secondsLeft}s
                  </motion.span>
                </div>
              )}

              {(status === 'error' || expired) && !isEmailVerified && (
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

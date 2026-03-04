import { motion, AnimatePresence } from 'framer-motion';
import { usePersistentCountdown } from '../../hooks/usePersistentCountDown';
import { env } from '../../utils/env';
import FormButton from '../../components/ui/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useCheckEmailVerificationStatus,
  useResendEmailVerification,
} from '../../hooks/useUsers';
import toast from 'react-hot-toast';
import { Trans, useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { PATHS } from '../../routes/paths';

type LocationState = {
  email?: string;
  message?: string;
  reason?: 'existing-unverified' | 'new-signup';
};

const CheckYourEmail = () => {
  const { t } = useTranslation();

  const countdownMinutes = Number(env.VERIFY_EMAIL_TIMER);
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  const email = state?.email;
  const backendMessage = state?.message;
  const reason = state?.reason;

  const { minutesLeft, remainingSeconds, reset, expired } =
    usePersistentCountdown('verify_email_timer', {
      minutes: countdownMinutes,
    });

  const { mutate: resendEmail, isPending } = useResendEmailVerification();

  const { data } = useCheckEmailVerificationStatus(true, email ?? '');

  const { isAccountVerified } = (data as { isAccountVerified?: boolean }) || {};

  const [redirectCountdown, setRedirectCountdown] = useState(3);

  useEffect(() => {
    if (isAccountVerified) {
      const interval = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            navigate(PATHS.AUTH.LOGIN);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isAccountVerified, navigate]);
  const handleResend = () => {
    if (!email) return;

    resendEmail(
      { email },
      {
        onSuccess: () => {
          reset();
          toast.success(t('auth.check_email.resend_success'));
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const title =
    reason === 'existing-unverified'
      ? t('auth.check_email.verify_title')
      : t('auth.check_email.title');

  const description =
    backendMessage ??
    (email ? (
      <Trans
        i18nKey={t('auth.check_email.description_with_email')}
        components={{ bold: <strong /> }}
        values={{ email }}
      />
    ) : (
      t('auth.check_email.description')
    ));

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <AnimatePresence mode="wait">
        {isAccountVerified ? (
          <motion.div
            key="verified"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-md w-full bg-surface rounded-2xl p-10 text-center shadow-xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mb-6 flex justify-center"
            >
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
                <FaCheckCircle className="w-10 h-10 text-success" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-surface-foreground text-2xl font-semibold mb-4"
            >
              {t('auth.check_email.account_verified')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-6"
            >
              {t('auth.check_email.redirecting_to_login', {
                seconds: redirectCountdown,
              })}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <FormButton onClick={() => navigate(PATHS.AUTH.LOGIN)}>
                {t('auth.check_email.go_to_login')}
              </FormButton>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="checking"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-md w-full bg-surface rounded-2xl p-10 text-center shadow-xl"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-surface-foreground text-2xl font-semibold mb-4"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground mb-6 text-left"
            >
              {description}
            </motion.p>
            <motion.p className="text-muted-foreground text-left mb-3 text-sm">
              {t('auth.check_email.spam_hint')}
            </motion.p>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <p className="text-muted-foreground mb-2">
                {expired
                  ? t('auth.check_email.link_expired')
                  : t('auth.check_email.link_expires_in')}
              </p>

              <motion.span
                key={`${minutesLeft}:${remainingSeconds}`}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.25 }}
                className="text-surface-foreground text-xl font-semibold"
              >
                {expired
                  ? '—'
                  : `${minutesLeft}:${remainingSeconds
                      .toString()
                      .padStart(2, '0')}`}
              </motion.span>
            </motion.div>

            <FormButton
              onClick={handleResend}
              disabled={!expired || isPending || !email}
            >
              {isPending
                ? t('auth.check_email.sending')
                : t('auth.check_email.resend')}
            </FormButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckYourEmail;

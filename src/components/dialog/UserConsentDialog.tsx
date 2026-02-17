import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { FaCheck, FaCreditCard, FaLock } from 'react-icons/fa6';
import { FaCheckCircle } from 'react-icons/fa';
import { useUser } from '../../hooks/useUsers';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { PATHS } from '../../routes/paths';
import { IMAGES } from '../../assets';
import { MdOutlineSyncAlt } from 'react-icons/md';

type UserConsentDialogProps = {
  isOpen: boolean;
  isPending: boolean;
  onDecline: () => void;
  onAccept: () => void;
};

const UserConsentDialog = ({
  isOpen,
  onAccept,
  onDecline,
  isPending,
}: UserConsentDialogProps) => {
  const { user } = useUser();
  const { t } = useTranslation();

  const [accepted, setAccepted] = useState<boolean>(false);
  const bankTransactionsDetails = t(
    'consent.access_items.bank_transactions_details',
    { returnObjects: true }
  ) as string[];

  const notificationDetails = t('consent.access_items.notifications_details', {
    returnObjects: true,
  }) as string[];

  const personalInfoDetails = t('consent.access_items.personal_info_details', {
    returnObjects: true,
  }) as string[];

  const getAvatarInitials = (name: string | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    const initials = names.map((n) => n.charAt(0).toUpperCase());
    return initials.slice(0, 2).join('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onDecline}
      title={t('consent.title')}
      width="max-w-lg"
    >
      <div className="pb-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary-gradient flex items-center justify-center ">
            <FaCreditCard className="w-8 h-8 text-primary-foreground" />
          </div>
          <MdOutlineSyncAlt className="w-6 h-6 text-muted-foreground " />
          <img
            src={IMAGES.PlaidLogo}
            alt="Plaid Logo"
            className="w-16 h-16 rounded-2xl bg-surface  shadow-lg shadow-surface/30"
          />
        </div>

        <h1 className="text-center text-2xl mb-2 text-foreground">
          {t('consent.authorize')} <span className="text-primary">Keepay</span>
        </h1>
        <p className="text-center text-sm text-muted-foreground mb-6">
          {t('consent.subtitle')}
        </p>

        <div className="bg-surface rounded-xl p-4 mb-6 flex items-center gap-3 border border-border">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
            <span className="text-lg">{getAvatarInitials(user?.name)}</span>
          </div>
          <div>
            <p className="text-sm text-surface-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-sm mb-4 text-foreground">
            {t('consent.request_access')}
          </h2>

          <div className="border border-border rounded-xl overflow-hidden bg-surface">
            <div className="p-4 border-b border-border">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="w-5 h-5 mt-0.5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm mb-2 text-surface-foreground">
                    {t('consent.access_items.bank_transactions')}
                  </p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {bankTransactionsDetails.map((item: string) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 border-b border-gray-700">
              <div className="flex items-start gap-3">
                <FaCheck className="w-5 h-5 mt-0.5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm mb-2 text-sureface-foreground">
                    {t('consent.access_items.notifications')}
                  </p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {notificationDetails.map((item: string) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="w-5 h-5 mt-0.5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm mb-2 text-surface-foreground">
                    {t('consent.access_items.personal_info')}
                  </p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {personalInfoDetails.map((item: string) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 mb-6">
          <div className="flex items-start gap-2">
            <FaLock className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">
                {t('consent.read_only_title')}
              </strong>{' '}
              {t('consent.read_only_text')}
            </p>
          </div>
        </div>

        <motion.div className=" w-full px-1">
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                id="userConsentAccepted"
                className="peer sr-only"
              />
              <div
                className={`
        w-6 h-6 rounded-md border transition-all duration-200 flex items-center justify-center
        ${accepted ? 'border-danger bg-danger/30' : 'border-border bg-surface'}
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
            <span className="text-muted-foreground text-sm">
              {t('consent.checkbox.text')}{' '}
              <Link
                to={PATHS.LEGAL.PRIVACY.full}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline transition"
              >
                {t('auth.register.legal.privacy')}
              </Link>{' '}
              {t('auth.register.legal.and')}{' '}
              <Link
                to={PATHS.LEGAL.TERMS.full}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline transition"
              >
                {t('auth.register.legal.terms')}
              </Link>
            </span>
          </label>
        </motion.div>
      </div>
      <div className="mt-6 flex gap-3 justify-end">
        <Button variant="secondary" onClick={onDecline}>
          {t('consent.actions.decline')}
        </Button>
        <Button onClick={onAccept} disabled={!accepted || isPending}>
          {isPending
            ? t('consent.actions.saving')
            : t('consent.actions.accept')}
        </Button>
      </div>
    </Modal>
  );
};

export default UserConsentDialog;

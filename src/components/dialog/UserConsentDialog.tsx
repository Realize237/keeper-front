import Modal from '../ui/Modal';
import FormButton from '../ui/FormButton';
import { FaCheck, FaCreditCard, FaLock, FaShield } from 'react-icons/fa6';
import { FaCheckCircle } from 'react-icons/fa';
import { useUser } from '../../hooks/useUsers';
import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from '../../constants';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

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
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#990800] to-[#C41E14] flex items-center justify-center shadow-lg shadow-[#990800]/30">
            <FaCreditCard className="w-8 h-8 text-white" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-2 h-2 rounded-full bg-[#FF6B5B]"></div>
            <div className="w-2 h-2 rounded-full bg-[#FF6B5B]"></div>
            <div className="w-2 h-2 rounded-full bg-[#FF6B5B]"></div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-[#008B82] flex items-center justify-center shadow-lg shadow-[#008B82]/30">
            <FaShield className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-center text-2xl mb-2 text-white">
          {t('consent.authorize')}{' '}
          <span style={{ color: '#FF6B5B' }}>Keepay</span>
        </h1>
        <p className="text-center text-sm text-gray-400 mb-6">
          {t('consent.subtitle')}
        </p>

        <div className="bg-gray-800/50 rounded-xl p-4 mb-6 flex items-center gap-3 border border-gray-700">
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#C41E14] to-[#FF6B5B] flex items-center justify-center text-white shadow-lg">
            <span className="text-lg">{getAvatarInitials(user?.name)}</span>
          </div>
          <div>
            <p className="text-sm text-white">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-sm mb-4 text-gray-300">
            {t('consent.request_access')}
          </h2>

          <div className="border border-gray-700 rounded-xl overflow-hidden bg-gray-800/30">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-start gap-3">
                <FaCheckCircle
                  className="w-5 h-5 mt-0.5 shrink-0"
                  style={{ color: '#008B82' }}
                />
                <div>
                  <p className="text-sm mb-2 text-white">
                    {t('consent.access_items.bank_transactions')}
                  </p>
                  <ul className="space-y-1 text-xs text-gray-400">
                    {bankTransactionsDetails.map((item: string) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 border-b border-gray-700">
              <div className="flex items-start gap-3">
                <FaCheck
                  className="w-5 h-5 mt-0.5 shrink-0"
                  style={{ color: '#008B82' }}
                />
                <div>
                  <p className="text-sm mb-2 text-white">
                    {t('consent.access_items.notifications')}
                  </p>
                  <ul className="space-y-1 text-xs text-gray-400">
                    {notificationDetails.map((item: string) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start gap-3">
                <FaCheckCircle
                  className="w-5 h-5 mt-0.5 shrink-0"
                  style={{ color: '#008B82' }}
                />
                <div>
                  <p className="text-sm mb-2 text-white">
                    {t('consent.access_items.personal_info')}
                  </p>
                  <ul className="space-y-1 text-xs text-gray-400">
                    {personalInfoDetails.map((item: string) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#008B82]/10 border border-[#008B82]/30 rounded-lg p-3 mb-6">
          <div className="flex items-start gap-2">
            <FaLock
              className="w-4 h-4 mt-0.5 shrink-0"
              style={{ color: '#008B82' }}
            />
            <p className="text-xs text-gray-300">
              <strong className="text-white">
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
        ${
          accepted
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
              {t('consent.checkbox.text')}{' '}
              <Link
                to={PRIVACY_POLICY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF6B5B] hover:underline transition"
              >
                {t('auth.register.legal.privacy')}
              </Link>{' '}
              {t('auth.register.legal.and')}{' '}
              <Link
                to={TERMS_OF_SERVICE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF6B5B] hover:underline transition"
              >
                {t('auth.register.legal.terms')}
              </Link>
            </span>
          </label>
        </motion.div>
      </div>
      <div className="mt-6 flex gap-3 justify-end">
        <FormButton variant="secondary" onClick={onDecline}>
          {t('consent.actions.decline')}
        </FormButton>
        <FormButton onClick={onAccept} disabled={!accepted || isPending}>
          {isPending
            ? t('consent.actions.saving')
            : t('consent.actions.accept')}
        </FormButton>
      </div>
    </Modal>
  );
};

export default UserConsentDialog;

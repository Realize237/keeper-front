import { motion } from 'framer-motion';
import {
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '../../components/ui/Avatar';
import { useTranslation } from 'react-i18next';
import { useDeleteUserAccount, useUser } from '../../hooks/useUsers';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationDialog from '../../components/dialog/ConfirmationDialog';

const InfoRow = ({
  icon: Icon,
  label,
  value,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  onClick?: () => void;
}) => (
  <motion.button
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="
      w-full flex items-center justify-between
      px-4 py-3 rounded-xl
      hover:bg-white/5 transition
    "
  >
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-white/60" />
      <div className="text-left">
        <p className="text-sm text-white/50">{label}</p>
        <p className="text-sm font-medium text-white">{value}</p>
      </div>
    </div>

    {onClick && <FaChevronRight className="w-4 h-4 text-white/30" />}
  </motion.button>
);

const AccountDetails = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { t, i18n } = useTranslation();
  const { mutate: deleteAccount } = useDeleteUserAccount();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  const handleConfirmDeleteAccount = () => {
    deleteAccount(undefined, {
      onError: (error: Error) => {
        toast.error(error.message || t('errors.UNEXPECTED_ERROR'));
      },
    });
  };

  return (
    <div className=" px-4 py-6">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-white/10 transition"
        >
          <FaChevronLeft className="w-5 h-5 text-white/80" />
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-semibold text-white mb-8">
          {t('profile.account_details.title')}
        </h1>
        <div className="flex items-center gap-4 mb-10">
          <Avatar size="xl" name={user?.name} src={user?.photo ?? ''} />

          <div>
            <p className="text-base font-medium text-white">
              {user?.name ?? ''}
            </p>
            <p className="text-sm text-white/50">{user?.email ?? ''}</p>
          </div>
        </div>
        <p className="text-xs uppercase tracking-wider text-white/40 mb-3">
          {t('profile.account_details.sections.account_info')}
        </p>
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl p-2">
          <InfoRow
            icon={FaUser}
            label={t('profile.account_details.fields.full_name')}
            value={user?.name ?? ''}
            onClick={() => navigate('/profile/edit')}
          />

          <InfoRow
            icon={FaEnvelope}
            label={t('profile.account_details.fields.email')}
            value={user?.email ?? ''}
          />

          <InfoRow
            icon={FaPhone}
            label={t('profile.account_details.fields.phone')}
            value={
              user?.phone ?? t('profile.account_details.fields.phone_not_set')
            }
            onClick={() => navigate('/profile/edit')}
          />
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60">
              {t('profile.account_details.fields.member_since')}
            </span>
            <span className="text-sm text-white">
              {new Date(user?.created_at ?? '').toLocaleDateString(
                i18n.language,
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }
              )}
            </span>
          </div>
        </div>
        <p className="text-xs uppercase tracking-wider text-white/40 mt-8 mb-3">
          {t('profile.account_details.sections.security')}
        </p>
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl p-2">
          <InfoRow
            icon={FaLock}
            label={t('profile.account_details.fields.password')}
            value="••••••••"
            onClick={() => navigate('/profile/change-password')}
          />
        </div>
        <p className="text-xs uppercase tracking-wider text-red-500/60 mt-10 mb-3">
          {t('profile.account_details.sections.danger')}
        </p>
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-2">
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="
      w-full flex items-center justify-between
      px-4 py-3 rounded-xl
      text-red-400
      hover:bg-red-500/10
      transition
    "
          >
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium">
                {t('profile.account_details.actions.delete_account')}
              </span>
              <span className="text-xs text-red-400/60">
                {t('profile.account_details.actions.delete_description')}
              </span>
            </div>
          </button>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDeleteAccount}
        title={t('delete_account.title')}
        message={t('delete_account.confirmation')}
        confirmText={t('delete_account.confirm')}
        cancelText={t('common.cancel')}
        isDestructive={true}
      />
    </div>
  );
};

export default AccountDetails;

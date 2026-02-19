import { useState } from 'react';
import { storage } from '../utils/storage';

import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useUpdateUser, useUser } from './useUsers';
import { CONSENT_KEY } from '../constants/storageKeys';

export const useUserConsent = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [showPlaidSyncDialog, setShowPlaidSyncDialog] =
    useState<boolean>(false);
  const { mutate: saveConsent, isPending: isSavingConsent } = useUpdateUser();

  const isPending = isSavingConsent;

  const checkAndShowModal = () => {
    if (!hasAskedBefore()) {
      setShowModal(true);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleConsentAccepted = () => {
    saveConsent(
      { user: { userConsentAccepted: true }, id: Number(user?.id) },
      {
        onSuccess: () => {
          storage.set(CONSENT_KEY, 'true');
          toast.success(t('consent.accepted'));
          setShowModal(false);
          setShowPlaidSyncDialog(true);
        },
        onError: () => {
          toast.error(t('consent.error'));
        },
      }
    );
  };

  const handleConsentDeclined = () => {
    storage.set(CONSENT_KEY, 'true');
    setShowModal(false);
  };

  const hasAskedBefore = () => {
    return (
      storage.get<boolean>(CONSENT_KEY) === true || user?.userConsentAccepted
    );
  };

  return {
    showModal,
    checkAndShowModal,
    handleConsentAccepted,
    handleConsentDeclined,
    hasAskedBefore,
    isPending,
    handleShowModal,
    showPlaidSyncDialog,
  };
};

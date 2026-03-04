import { useState } from 'react';
import { storage } from '../utils/storage';
import { CONSENT_KEY } from '../constants/storageKeys';
import { useUser } from './useUsers';

export const useUserConsent = () => {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [showPlaidSyncDialog, setShowPlaidSyncDialog] =
    useState<boolean>(false);

  const checkAndShowModal = () => {
    if (!hasAskedBefore()) {
      setShowModal(true);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleConsentAccepted = () => {
    storage.set(CONSENT_KEY, 'true');
    setShowModal(false);
    setShowPlaidSyncDialog(true);
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
    handleShowModal,
    showPlaidSyncDialog,
    setShowPlaidSyncDialog,
  };
};

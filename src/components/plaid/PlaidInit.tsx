import { useCallback, useContext, useEffect, useRef } from 'react';
import PlaidContext from '../../context/PlaidContext';
import { usePlaidSyncCardSubscriptions } from '../../hooks/usePlaid';
import { Trans, useTranslation } from 'react-i18next';
import usePlaidLinkHook from '../../hooks/usePlaidLinkHook';
import { FaCreditCard } from 'react-icons/fa6';
import { MdOutlineSyncAlt } from 'react-icons/md';
import { IMAGES } from '../../assets';
import { PATHS } from '../../routes/paths';
import Button from '../ui/Button';
import { FiAlertCircle, FiLock } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';

const PlaidInit = ({ onClose = () => {} }: { onClose?: () => void }) => {
  const {
    dispatch,
    accessToken,
    linkToken,
    linkSuccess,
    linkTokenError,
    isSubscriptionSynced,
  } = useContext(PlaidContext);
  const { t } = useTranslation();

  const { open, ready } = usePlaidLinkHook();
  const { mutate: syncCardSubscriptions, isPending: isSyncing } =
    usePlaidSyncCardSubscriptions();

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const launchSyncCardSubscriptions = useCallback(() => {
    syncCardSubscriptions(undefined, {
      onSuccess: () => {
        dispatch({ type: 'SET_STATE', state: { isSubscriptionSynced: true } });
        onCloseRef.current();
      },
    });
  }, [syncCardSubscriptions, dispatch]);

  useEffect(() => {
    if (linkSuccess && accessToken && !isSyncing && !isSubscriptionSynced) {
      launchSyncCardSubscriptions();
    }
  }, [
    linkSuccess,
    accessToken,
    isSyncing,
    isSubscriptionSynced,
    launchSyncCardSubscriptions,
  ]);

  return (
    <>
      <>
        <h2 className="text-2xl font-bold text-center mb-4">
          {t('plaid.title')}
        </h2>
        <div className="bg-surface flex justify-center w-full p-4 rounded-xl mb-4">
          <div className="flex items-center justify-center gap-4 ">
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
        </div>

        <p className="mb-4">
          <Trans
            i18nKey="plaid.description"
            components={{
              span: <span className="font-semibold" />,
            }}
          />
        </p>

        <p className="font-semibold mb-3">{t('plaid.benefits_title')}</p>

        <ul className="mb-6 space-y-3">
          <li className="flex items-center gap-2">
            <FaCheck className="text-primary w-4 h-4" />
            {t('plaid.benefit_1')}
          </li>

          <li className="flex items-center gap-2">
            <FaCheck className="text-primary w-4 h-4" />
            {t('plaid.benefit_2')}
          </li>

          <li className="flex items-center gap-2">
            <FaCheck className="text-primary w-4 h-4" />
            {t('plaid.benefit_3')}
          </li>
        </ul>
        <div className="flex items-center gap-2 ">
          <FiLock className="mt-1 w-4 h-4 text-primary" />
          <p className="text-sm text-foreground ">
            <Trans
              i18nKey="plaid.security"
              components={{
                span: <span className="font-semibold" />,
                strong: <span className="font-semibold" />,
              }}
            />
          </p>
        </div>

        <p className="text-sm text-muted-foreground my-6">
          <Trans
            i18nKey="plaid.support"
            components={{
              support: (
                <a href={PATHS.SUPPORT} className="text-primary underline" />
              ),
            }}
          />
        </p>
        {Object.values(linkTokenError).every((value) => value.length > 0) ? (
          <div className="mb-6 rounded-xl border border-danger/20 bg-danger/5 p-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-danger/10 flex items-center justify-center">
                <FiAlertCircle className="w-4 h-4 text-danger" />
              </div>

              <div className="flex-1">
                <h4 className="text-sm font-semibold text-danger mb-2">
                  {t('plaid.error.title')}
                </h4>

                <p className="text-sm text-danger mb-3">
                  {linkTokenError.error_message}
                </p>

                <div className="text-xs text-danger space-y-1 border-t border-danger/20 pt-3">
                  <p>
                    <span className="font-medium">
                      {t('plaid.error.code')}:
                    </span>{' '}
                    {linkTokenError.error_code}
                  </p>

                  <p>
                    <span className="font-medium">
                      {t('plaid.error.type')}:
                    </span>{' '}
                    {linkTokenError.error_type}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : linkToken === '' ? (
          <Button isLoading={true} disabled={true}>
            {t('plaid.loading')}
          </Button>
        ) : (
          <>
            <Button disabled={!ready} onClick={() => open()} size="lg">
              {t('plaid.actions.sync')}
            </Button>
          </>
        )}
      </>
    </>
  );
};

export default PlaidInit;

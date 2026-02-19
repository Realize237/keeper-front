import { useContext } from 'react';
import PlaidContext from '../../context/PlaidContext';
import { usePlaidSyncCardSubscriptions } from '../../hooks/usePlaid';
import { useTranslation } from 'react-i18next';
import usePlaidLinkHook from '../../hooks/usePlaidLinkHook';

const PlaidInit = ({ onClose }: { onClose: () => void }) => {
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

  const lauchSyncCardSubscriptions = () => {
    syncCardSubscriptions(undefined, {
      onSuccess: () => {
        dispatch({ type: 'SET_STATE', state: { isSubscriptionSynced: true } });
        onClose();
      },
    });
  };

  // this is for to replace the functionality of lauch my subscription button
  // useEffect(() => {
  //   if(!isSyncing && isSubscriptionSynced) {
  //     lauchSyncCardSubscriptions()
  //   }
  // }, [isSyncing, isSubscriptionSynced]);

  return (
    <div className="w-3/4 h-3/4 mx-auto my-8 p-6 border border-gray-300 rounded-lg shadow-md overflow-y-auto">
      {/* <h3 className="text-xl font-bold mb-4">{t('plaid.title')}</h3> */}

      {!linkSuccess && (
        <>
          <h4 className="text-lg font-semibold mb-2">
            {t('plaid.start_title')}
          </h4>
          <p className="mb-4">{t('plaid.start_description')}</p>

          {Object.values(linkTokenError).every((value) => value.length > 0) ? (
            <div className="p-4 bg-red-100 border border-red-300 rounded text-sm text-red-800 mb-4">
              <p>
                <strong>{t('plaid.error.code')}:</strong>{' '}
                <code>{linkTokenError.error_code}</code>
              </p>
              <p>
                <strong>{t('plaid.error.type')}:</strong>{' '}
                <code>{linkTokenError.error_type}</code>
              </p>
              <p>
                <strong>{t('plaid.error.message')}:</strong>{' '}
                {linkTokenError.error_message}
              </p>
            </div>
          ) : linkToken === '' ? (
            <button
              disabled
              className="p-2 bg-blue-500 rounded-md text-white opacity-70 cursor-not-allowed"
            >
              {t('plaid.loading')}
            </button>
          ) : (
            <>
              <button
                disabled={!ready}
                onClick={() => open()}
                className="p-2 bg-blue-700 hover:bg-blue-500 cursor-pointer rounded-md text-white my-4"
              >
                {'Sync my account now'}
              </button>
            </>
          )}
        </>
      )}

      {linkSuccess && accessToken && (
        <div className="my-6">
          <h4 className="text-lg font-semibold mb-2">
            {t('plaid.recurring_title')}
          </h4>
          <button
            onClick={() => lauchSyncCardSubscriptions()}
            disabled={isSyncing}
            className={`p-2 px-4 rounded-md text-white transition ${
              isSyncing
                ? 'bg-blue-500 cursor-not-allowed'
                : 'bg-blue-700 hover:bg-blue-800'
            }`}
          >
            {isSyncing
              ? t('plaid.syncing')
              : isSubscriptionSynced
                ? t('plaid.synced')
                : t('plaid.load_subscriptions')}
          </button>
        </div>
      )}
    </div>
  );
};

export default PlaidInit;

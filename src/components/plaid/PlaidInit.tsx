import { useContext } from 'react';
import PlaidContext from '../../context/PlaidContext';
import PlaidLink from './PlaidLink';
import { usePlaidSyncCardSubscriptions } from '../../hooks/usePlaid';

const PlaidInit = () => {
  const {
    dispatch,
    accessToken,
    linkToken,
    linkSuccess,
    linkTokenError,
    isSubscriptionSynced,
    products = [],
  } = useContext(PlaidContext);

  const { mutate: syncCardSubscriptions, isPending: isSyncing } =
    usePlaidSyncCardSubscriptions();

  const lauchSyncCardSubscriptions = () => {
    syncCardSubscriptions(undefined, {
      onSuccess: () => {
        dispatch({ type: 'SET_STATE', state: { isSubscriptionSynced: true } });
      },
    });
  };

  return (
    <div className="w-3/4 h-3/4 mx-auto my-8 p-6 border border-gray-300 rounded-lg shadow-md overflow-y-auto">
      <h3 className="text-xl font-bold mb-4">Connect your bank</h3>

      {!linkSuccess && (
        <>
          <h4 className="text-lg font-semibold mb-2">
            Start by linking your bank account
          </h4>
          <p className="mb-4">
            Click the button below to launch the Plaid connection flow.
          </p>

          {Object.values(linkTokenError).every((value) => value.length > 0) ? (
            <div className="p-4 bg-red-100 border border-red-300 rounded text-sm text-red-800 mb-4">
              <p>
                <strong>Link Error Code:</strong>{' '}
                <code>{linkTokenError.error_code}</code>
              </p>
              <p>
                <strong>Link Error Type:</strong>{' '}
                <code>{linkTokenError.error_type}</code>
              </p>
              <p>
                <strong>Link Error Message:</strong>{' '}
                {linkTokenError.error_message}
              </p>
            </div>
          ) : linkToken === '' ? (
            <button
              disabled
              className="p-2 bg-blue-500 rounded-md text-white opacity-70 cursor-not-allowed"
            >
              Loading...
            </button>
          ) : (
            <div className="flex justify-start items-center">
              <PlaidLink />
            </div>
          )}
        </>
      )}

      {linkSuccess && accessToken && (
        <div className="my-6">
          <h4 className="text-lg font-semibold mb-2">
            Recurring Subscriptions
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
              ? 'Syncing...'
              : isSubscriptionSynced
                ? 'Subscriptions Synced'
                : 'Load all your subscriptions'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PlaidInit;

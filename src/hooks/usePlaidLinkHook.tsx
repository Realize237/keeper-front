import React, { useEffect, useContext } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { usePlaidExchangePublicToken } from './usePlaid';
import PlaidContext from '../context/PlaidContext';

const usePlaidLinkHook = () => {
  const { linkToken, isPaymentInitiation, isCraProductsExclusively, dispatch } =
    useContext(PlaidContext);

  const { mutate: exchangePublicToken } = usePlaidExchangePublicToken();
  const onSuccess = React.useCallback(
    (public_token: string) => {
      if (!isPaymentInitiation && !isCraProductsExclusively) {
        exchangePublicToken(
          { public_token },
          {
            onSuccess: () => {
              dispatch({
                type: 'SET_STATE',
                state: {
                  itemId: true,
                  accessToken: true,
                  isItemAccess: true,
                  linkSuccess: true,
                },
              });
            },
            onError: () => {
              console.log('Error exchanging public token');
              dispatch({
                type: 'SET_STATE',
                state: {
                  itemId: false,
                  accessToken: false,
                  isItemAccess: false,
                },
              });
            },
          }
        );
      } else {
        // For 'payment_initiation' or CRA-only products
        dispatch({ type: 'SET_STATE', state: { isItemAccess: false } });
      }

      // dispatch({ type: 'SET_STATE', state: { linkSuccess: true } });
      // window.history.pushState('', '', '/');
    },
    [
      dispatch,
      exchangePublicToken,
      isPaymentInitiation,
      isCraProductsExclusively,
    ]
  );

  let isOauth = false;
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess,
  };

  if (window.location.href.includes('?oauth_state_id=')) {
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (isOauth && ready) {
      open();
    }
  }, [ready, open, isOauth]);

  return { open, ready };
};

export default usePlaidLinkHook;

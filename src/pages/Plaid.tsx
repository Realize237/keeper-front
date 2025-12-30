import { useEffect, useCallback, useContext } from 'react';
import PlaidContext from '../context/PlaidContext';
import PlaidInit from '../components/plaid/PlaidInit';
import { usePlaidCreateLinkToken } from '../hooks/usePlaid';

export default function Plaid() {
  const { dispatch } = useContext(PlaidContext);

  const { mutate: createLinkToken } = usePlaidCreateLinkToken();

  const generateLinkToken = useCallback(() => {
    createLinkToken(undefined, {
      onSuccess: (data) => {
        localStorage.setItem('link_token', data.link_token);

        dispatch({
          type: 'SET_STATE',
          state: { linkToken: data.link_token },
        });
      },
      onError: (error) => {
        dispatch({
          type: 'SET_STATE',
          state: {
            linkToken: null,
            linkTokenError: {
              error_message: error.message,
              error_code: 'API_ERROR',
              error_type: 'INVALID_REQUEST',
            },
          },
        });
      },
    });
  }, [createLinkToken, dispatch]);

  useEffect(() => {
    // OAuth redirect flow → reuse stored token
    if (window.location.href.includes('?oauth_state_id=')) {
      dispatch({
        type: 'SET_STATE',
        state: {
          linkToken: localStorage.getItem('link_token'),
        },
      });
      return;
    }

    generateLinkToken();
  }, [dispatch, generateLinkToken]);

  return (
    <div className="w-full h-full flex justify-center items-center text-white">
      <PlaidInit />
    </div>
  );
}

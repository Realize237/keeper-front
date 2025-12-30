import { createContext, useReducer, Dispatch, ReactNode } from 'react';

interface PlaidstartState {
  linkSuccess: boolean;
  isItemAccess: boolean;
  isPaymentInitiation: boolean;
  isUserTokenFlow: boolean;
  isCraProductsExclusively: boolean;
  linkToken: string | null;
  accessToken: boolean;
  userToken: string | null;
  itemId: boolean;
  isError: boolean;
  backend: boolean;
  isSubscriptionSynced: boolean;
  products: string[];
  linkTokenError: {
    error_message: string;
    error_code: string;
    error_type: string;
  };
}

const initialState: PlaidstartState = {
  linkSuccess: false,
  isItemAccess: true,
  isPaymentInitiation: false,
  isCraProductsExclusively: false,
  isUserTokenFlow: true,
  linkToken: '', // Don't set to null or error message will show up briefly when site loads
  userToken: null,
  accessToken: false,
  itemId: false,
  isError: false,
  backend: true,
  isSubscriptionSynced: false,
  products: ['transactions'],
  linkTokenError: {
    error_type: '',
    error_code: '',
    error_message: '',
  },
};

type PlaidstartAction = {
  type: 'SET_STATE';
  state: Partial<PlaidstartState>;
};

interface PlaidstartContext extends PlaidstartState {
  dispatch: Dispatch<PlaidstartAction>;
}

const PlaidContext = createContext<PlaidstartContext>(
  initialState as PlaidstartContext
);

const { Provider } = PlaidContext;
export const PlaidstartProvider: React.FC<{ children: ReactNode }> = (
  props
) => {
  const reducer = (
    state: PlaidstartState,
    action: PlaidstartAction
  ): PlaidstartState => {
    switch (action.type) {
      case 'SET_STATE':
        return { ...state, ...action.state };
      default:
        return { ...state };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ ...state, dispatch }}>{props.children}</Provider>;
};

export default PlaidContext;

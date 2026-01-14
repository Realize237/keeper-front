import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createLinkToken,
  exchangePublicToken,
  getRecuringTransactions,
  getTransactions,
  syncCardSubscriptions,
} from '../api/plaid';
import { plaidKeys } from '../queryKeys/plaidKeys';

export const usePlaidCreateLinkToken = () => {
  return useMutation<{ data: { link_token: string } }, Error>({
    mutationFn: () => createLinkToken(),
    meta: {
      invalidate: [plaidKeys.exchange_public_token],
    },
  });
};

export const usePlaidExchangePublicToken = () => {
  return useMutation<
    { statusCode: number; message: string },
    Error,
    { public_token: string }
  >({
    mutationFn: ({ public_token }) => exchangePublicToken(public_token),
    meta: {
      invalidate: [
        plaidKeys.recurring_transactions,
        plaidKeys.sync_card_subscriptions,
      ],
    },
  });
};

export const usePlaidSyncCardSubscriptions = () => {
  return useMutation<{ statusCode: number; message: string }, Error>({
    mutationFn: () => syncCardSubscriptions(),
  });
};

export const usePlaidRecurringTransactions = () => {
  return useQuery<[]>({
    queryKey: plaidKeys.recurring_transactions,
    queryFn: getRecuringTransactions,
  });
};

export const usePlaidTransactions = () => {
  return useQuery<[]>({
    queryKey: plaidKeys.transactions,
    queryFn: getTransactions,
  });
};

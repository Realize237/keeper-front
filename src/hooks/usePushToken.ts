import { useMutation } from '@tanstack/react-query';
import { saveWebPushToken } from '../services/pushTokenService';

export const useSaveWebPushToken = () => {
  return useMutation<unknown, Error, string>({
    mutationFn: saveWebPushToken,
  });
};

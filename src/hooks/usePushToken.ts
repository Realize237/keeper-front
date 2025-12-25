import { useMutation } from '@tanstack/react-query';
import { saveWebPushToken } from '../services/pushTokenService';

export const useSaveWebPushToken = () => {
  return useMutation<{ statusCode: number; message: string }, Error, string>({
    mutationFn: saveWebPushToken,
    onError: (error) => {
      console.error('Error saving push token:', error);
    },
  });
};

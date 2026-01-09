import { useMutation, useQuery } from '@tanstack/react-query';
import {
  initiateGoogleCalendarAuth,
  checkGoogleCalendarAccess,
  disconnectGoogleCalendar,
} from '../services/googleCalendarService';
import toast from 'react-hot-toast';
import { googleCalendarKeys } from '../queryKeys/googleCalendarKeys';
import { useTranslation } from 'react-i18next';
import { useUser } from './useUsers';

export const useGoogleCalendarAccess = () => {
  const { user } = useUser();

  return useQuery({
    queryKey: googleCalendarKeys.access(user?.id),
    queryFn: () => checkGoogleCalendarAccess(user!.id),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useConnectGoogleCalendar = () => {
  const { user } = useUser();

  return useMutation({
    mutationFn: () => initiateGoogleCalendarAuth(user!.id),

    meta: {
      invalidate: [googleCalendarKeys.access(user?.id)],
    },
  });
};

export const useDisconnectGoogleCalendar = () => {
  const { user } = useUser();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: () => disconnectGoogleCalendar(user!.id),
    onSuccess: () => {
      toast.success(t('google_calendar.disconnect'));
    },
    onError: () => {
      toast.error(t('google_calendar.disconnect_failed'));
    },
    meta: {
      invalidate: [googleCalendarKeys.access(user?.id)],
    },
  });
};

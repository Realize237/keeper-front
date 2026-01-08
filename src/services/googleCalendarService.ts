import { axiosClient } from '../lib/axiosClient';
import { API_PATHS } from '../api/api-paths';
import { env } from '../utils/env';
import { processError } from '../utils';
import { useTranslation } from 'react-i18next';

export interface GoogleCalendarAuthResponse {
  success: boolean;
  message: string;
  hasAccess?: boolean;
}

export const initiateGoogleCalendarAuth = (
  userId: number
): Promise<boolean> => {
  const { t } = useTranslation();
  return new Promise((resolve, reject) => {
    const popup = window.open(
      `${env.API_URL}${API_PATHS.GOOGLE.CALENDAR_AUTH}?userId=${userId}&popup=true`,
      'google-calendar-auth',
      'width=500,height=600,scrollbars=yes,resizable=yes'
    );
    if (!popup) {
      reject(new Error(t('google_calendar.auth.popup_blocked')));
      return;
    }

    const messageListener = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === 'GOOGLE_CALENDAR_AUTH_SUCCESS') {
        popup.close();
        window.removeEventListener('message', messageListener);
        resolve(true);
      } else if (event.data.type === 'GOOGLE_CALENDAR_AUTH_ERROR') {
        popup.close();
        window.removeEventListener('message', messageListener);
        reject(
          new Error(event.data.message || t('google_calendar.auth.failed'))
        );
      }
    };

    window.addEventListener('message', messageListener);

    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        window.removeEventListener('message', messageListener);
        reject(new Error(t('google_calendar.auth.failed')));
      }
    }, 1000);
  });
};

export const checkGoogleCalendarAccess = async (
  userId: number
): Promise<boolean> => {
  try {
    const response = await axiosClient.get<{
      hasAccess: boolean;
    }>(`${env.API_URL}${API_PATHS.GOOGLE.CALENDAR_STATUS}`, {
      params: { userId },
      withCredentials: true,
    });

    return response.data.hasAccess;
  } catch (err: any) {
    processError(err);
    return false;
  }
};

export const disconnectGoogleCalendar = async (
  userId: number
): Promise<boolean> => {
  try {
    await axiosClient.post(
      `${env.API_URL}${API_PATHS.GOOGLE.CALENDAR_DISCONNECT}`,
      { userId },
      {
        withCredentials: true,
      }
    );

    return true;
  } catch (err: any) {
    processError(err);
    return false;
  }
};

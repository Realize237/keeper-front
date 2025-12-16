import axios from 'axios';
import { API_PATHS } from '../api/api-paths';
import { env } from '../utils/env';
import { processError } from '../utils';

export interface GoogleCalendarAuthResponse {
  success: boolean;
  message: string;
  hasAccess?: boolean;
}

export const initiateGoogleCalendarAuth = (
  userId: number
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const popup = window.open(
      `${env.API_URL}${API_PATHS.GOOGLE.CALENDAR_AUTH}?userId=${userId}&popup=true`,
      'google-calendar-auth',
      'width=500,height=600,scrollbars=yes,resizable=yes'
    );
    if (!popup) {
      reject(new Error('Popup blocked. Please allow popups for this site.'));
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
        reject(new Error(event.data.message || 'Authentication failed'));
      }
    };

    window.addEventListener('message', messageListener);

    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        window.removeEventListener('message', messageListener);
        reject(new Error('Authentication cancelled'));
      }
    }, 1000);
  });
};

export const checkGoogleCalendarAccess = async (
  userId: number
): Promise<boolean> => {
  try {
    const response = await axios.get<{
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
    await axios.post(
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

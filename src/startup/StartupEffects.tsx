import { useEffect } from 'react';
import { getFirebaseToken } from '../config/firebase';
import { useSaveWebPushToken } from '../hooks/usePushToken';
import { useUser } from '../hooks/useUsers';

export function StartupEffects() {
  const { isUserReady, user } = useUser();
  const { mutate: saveWebPushToken } = useSaveWebPushToken();

  useEffect(() => {
    if (!isUserReady || !user) return;

    const run = async () => {
      if (Notification.permission === 'granted') {
        const token = await getFirebaseToken();
        if (token) saveWebPushToken(token);
      }
    };

    run();
  }, [isUserReady, user, saveWebPushToken]);

  return null;
}

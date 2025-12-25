import { CookiesProvider } from 'react-cookie';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Subscriptions from './pages/Subscriptions';
import MainLayout from './layouts/MainLayout';
import NotificationsPage from './pages/Notifications';
import { Toaster } from 'react-hot-toast';
import { UserProvider, useUser } from './context/UserContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import Cards from './pages/Cards';
import SharedPlan from './pages/SharedPlan';
import Profile from './pages/profile/Profile';
import NavLayout from './layouts/NavLayout';
import EditProfile from './pages/profile/EditProfile';
import ChangePassword from './pages/profile/ChangePassword';
import SetPassword from './pages/profile/SetPassword';
import { PlaidstartProvider } from './context/PlaidContext';
import Plaid from './pages/Plaid';
import { useEffect } from 'react';
import { getFirebaseToken } from './config/firebase';
import { useSaveWebPushToken } from './hooks/usePushToken';

function PushTokenHandler() {
  const { isUserReady, user } = useUser();
  const { mutate: saveWebPushToken } = useSaveWebPushToken();

  useEffect(() => {
    const getClientPushToken = async () => {
      if (Notification.permission === 'granted') {
        const fcmToken = await getFirebaseToken();
        if (fcmToken) {
          saveWebPushToken(fcmToken);
        }
      }
    };

    if (isUserReady && user) {
      getClientPushToken();
    }
  }, [isUserReady, user, saveWebPushToken]);

  return null;
}
import { TOASTER_OPTIONS } from './constants';
import { SocketProvider } from './context/SocketContext';

export default function App() {
  return (
    <CookiesProvider>
      <UserProvider>
        <PlaidstartProvider>
          <PushTokenHandler />
          <SocketProvider>
            <Router basename="/">
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    element={
                      <ProtectedRoute>
                        <NavLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route path="/plaid" element={<Plaid />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                    <Route path="/cards" element={<Cards />} />
                    <Route path="/shared-plan" element={<SharedPlan />} />
                    <Route path="/profile">
                      <Route index element={<Profile />} />
                      <Route path="edit" element={<EditProfile />} />
                      <Route
                        path="change-password"
                        element={<ChangePassword />}
                      />
                    </Route>
                    <Route
                      path="/notifications"
                      element={<NotificationsPage />}
                    />

                    <Route
                      path="/notifications"
                      element={<NotificationsPage />}
                    />
                  </Route>
                  <Route path="set-password" element={<SetPassword />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </Router>
            <Toaster toastOptions={{ ...TOASTER_OPTIONS }} />
          </SocketProvider>
        </PlaidstartProvider>
      </UserProvider>
    </CookiesProvider>
  );
}

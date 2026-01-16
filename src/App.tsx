import { CookiesProvider } from 'react-cookie';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Subscriptions from './pages/Subscriptions';
import MainLayout from './layouts/MainLayout';
import NotificationsPage from './pages/Notifications';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/UserContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import Cards from './pages/Cards';
import SharedPlan from './pages/SharedPlan';
import Profile from './pages/profile/Profile';
import NavLayout from './layouts/NavLayout';
import EditProfile from './pages/profile/EditProfile';
import ChangePassword from './pages/profile/ChangePassword';
import SetPassword from './pages/profile/SetPassword';
import { useEffect } from 'react';
import { getFirebaseToken } from './config/firebase';
import { useSaveWebPushToken } from './hooks/usePushToken';
import { TOASTER_OPTIONS } from './constants';
import { SocketProvider } from './context/SocketContext';
import { PlaidstartProvider } from './context/PlaidContext';
import Plaid from './pages/Plaid';
import Settings from './pages/Settings';
import AccountDetails from './pages/profile/AccountDetails';
import NotFound from './pages/NotFound';
import ContactUs from './pages/ContactUs';
import { LogoutProvider } from './context/LogoutContext';
import { useUser } from './hooks/useUsers';
import HomePage from './pages/HomePage';
import { LanguageProvider } from './context/LanguageContext';
import { PricingPage } from './pages/PricingPage';
import { TermsConditions } from './pages/Legal/TermsConditions';
import { PrivacyPolicy } from './pages/Legal/PrivacyPolicy';
import { CookiePolicy } from './pages/Legal/CookiePolicy';
import { GDPRCompliance } from './pages/Legal/GDPRCompliance';
import { LegalLayout } from './layouts/LegalLayout';

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

export default function App() {
  return (
    <LanguageProvider>
      <CookiesProvider>
        <UserProvider>
          <PushTokenHandler />
          <LogoutProvider>
            <PlaidstartProvider>
              <SocketProvider>
                <Router basename="/">
                  <Routes>
                    <Route element={<MainLayout />}>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/legal" element={<LegalLayout />}>
                        <Route index element={<PrivacyPolicy />} />{' '}
                        <Route
                          path="privacy-policy"
                          element={<PrivacyPolicy />}
                        />
                        <Route
                          path="terms-of-service"
                          element={<TermsConditions />}
                        />
                        <Route path="cookies" element={<CookiePolicy />} />
                        <Route path="gdpr" element={<GDPRCompliance />} />
                      </Route>

                      <Route path="/pricing" element={<PricingPage />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/login" element={<Login />} />
                      <Route
                        element={
                          <ProtectedRoute>
                            <NavLayout />
                          </ProtectedRoute>
                        }
                      >
                        <Route path="/plaid" element={<Plaid />} />
                        <Route
                          path="/subscriptions"
                          element={<Subscriptions />}
                        />
                        <Route path="/cards" element={<Cards />} />
                        <Route path="/shared-plan" element={<SharedPlan />} />
                        <Route path="/profile">
                          <Route index element={<Profile />} />
                          <Route path="edit" element={<EditProfile />} />
                          <Route
                            path="change-password"
                            element={<ChangePassword />}
                          />
                          <Route
                            path="account-details"
                            element={<AccountDetails />}
                          />
                        </Route>
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/contact" element={<ContactUs />} />
                        <Route
                          path="/notifications"
                          element={<NotificationsPage />}
                        />
                        <Route path="/settings" element={<Settings />} />
                      </Route>
                      <Route path="set-password" element={<SetPassword />} />
                      <Route path="*" element={<NotFound />} />
                    </Route>
                  </Routes>
                </Router>
                <Toaster toastOptions={{ ...TOASTER_OPTIONS }} />
              </SocketProvider>
            </PlaidstartProvider>
          </LogoutProvider>
        </UserProvider>
      </CookiesProvider>
    </LanguageProvider>
  );
}

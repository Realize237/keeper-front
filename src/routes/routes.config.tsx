import { ReactNode } from 'react';
import MainLayout from '../layouts/MainLayout';
import NavLayout from '../layouts/NavLayout';
import { lazyImport } from './lazyImport';
import { PublicRoute } from '../components/common/PublicRoute';
import { PATHS } from './paths';

// Public pages
const HomePage = lazyImport(() => import('../pages/HomePage'));
const Login = lazyImport(() => import('../pages/auth/Login'));
const Register = lazyImport(() => import('../pages/auth/Register'));
const LegalLayout = lazyImport(() =>
  import('../layouts/LegalLayout').then((module) => ({
    default: module.LegalLayout,
  }))
);
const PrivacyPolicy = lazyImport(() =>
  import('../pages/legal/PrivacyPolicy').then((module) => ({
    default: module.PrivacyPolicy,
  }))
);
const TermsConditions = lazyImport(() =>
  import('../pages/legal/TermsConditions').then((module) => ({
    default: module.TermsConditions,
  }))
);
const CookiePolicy = lazyImport(() =>
  import('../pages/legal/CookiePolicy').then((module) => ({
    default: module.CookiePolicy,
  }))
);
const GDPRCompliance = lazyImport(() =>
  import('../pages/legal/GDPRCompliance').then((module) => ({
    default: module.GDPRCompliance,
  }))
);
const PricingPage = lazyImport(() =>
  import('../pages/PricingPage').then((module) => ({
    default: module.PricingPage,
  }))
);
const NotFound = lazyImport(() => import('../pages/NotFound'));
const SetPassword = lazyImport(() => import('../pages/profile/SetPassword'));
const CheckYourEmail = lazyImport(() => import('../pages/auth/CheckYourEmail'));
const VerifyEmail = lazyImport(() => import('../pages/auth/VerifyEmail'));

// Protected pages
const Plaid = lazyImport(() => import('../pages/Plaid'));
const Subscriptions = lazyImport(() => import('../pages/Subscriptions'));
const Cards = lazyImport(() => import('../pages/Cards'));
const SharedPlan = lazyImport(() => import('../pages/SharedPlan'));
const NotificationsPage = lazyImport(() => import('../pages/Notifications'));
const Settings = lazyImport(() => import('../pages/Settings'));
const ContactUs = lazyImport(() => import('../pages/ContactUs'));

const ProfileLayout = lazyImport(
  () => import('../pages/profile/ProfileLayout')
);
const Profile = lazyImport(() => import('../pages/profile/Profile'));
const EditProfile = lazyImport(() => import('../pages/profile/EditProfile'));
const ChangePassword = lazyImport(
  () => import('../pages/profile/ChangePassword')
);
const AccountDetails = lazyImport(
  () => import('../pages/profile/AccountDetails')
);

export type AppRoute = {
  path?: string;
  index?: boolean;
  element?: ReactNode;
  layout?: ReactNode;
  protected?: boolean;
  children?: AppRoute[];
};

export const routes: AppRoute[] = [
  {
    layout: <MainLayout />,
    children: [
      { path: PATHS.HOME, element: <HomePage /> },
      {
        path: PATHS.LEGAL.ROOT,
        element: <LegalLayout />,
        children: [
          { path: PATHS.LEGAL.PRIVACY.route, element: <PrivacyPolicy /> },
          { path: PATHS.LEGAL.TERMS.route, element: <TermsConditions /> },
          { path: PATHS.LEGAL.COOKIES.route, element: <CookiePolicy /> },
          { path: PATHS.LEGAL.GDPR.route, element: <GDPRCompliance /> },
        ],
      },
      { path: PATHS.PRICING, element: <PricingPage /> },
      {
        path: PATHS.AUTH.REGISTER,
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: PATHS.AUTH.LOGIN,
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      { path: PATHS.AUTH.CHECK_EMAIL, element: <CheckYourEmail /> },
      { path: PATHS.AUTH.VERIFY_EMAIL, element: <VerifyEmail /> },
      { path: PATHS.AUTH.SET_PASSWORD, element: <SetPassword /> },

      {
        protected: true,
        layout: <NavLayout />,
        children: [
          { path: PATHS.APP.PLAID, element: <Plaid /> },
          { path: PATHS.APP.SUBSCRIPTIONS, element: <Subscriptions /> },
          { path: PATHS.APP.CARDS, element: <Cards /> },
          { path: PATHS.APP.SHARED_PLAN, element: <SharedPlan /> },

          {
            path: PATHS.APP.PROFILE.ROOT,
            element: <ProfileLayout />,
            children: [
              { index: true, element: <Profile /> },
              { path: PATHS.APP.PROFILE.EDIT.route, element: <EditProfile /> },
              {
                path: PATHS.APP.PROFILE.CHANGE_PASSWORD.route,
                element: <ChangePassword />,
              },
              {
                path: PATHS.APP.PROFILE.ACCOUNT_DETAILS.route,
                element: <AccountDetails />,
              },
            ],
          },

          { path: PATHS.APP.SETTINGS, element: <Settings /> },
          { path: PATHS.APP.CONTACT, element: <ContactUs /> },
          {
            path: PATHS.APP.NOTIFICATIONS,
            element: <NotificationsPage />,
          },
        ],
      },

      { path: '*', element: <NotFound /> },
    ],
  },
];

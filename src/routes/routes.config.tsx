import { ReactNode } from 'react';
import MainLayout from '../layouts/MainLayout';
import NavLayout from '../layouts/NavLayout';
import { lazyImport } from './lazyImport';

// Public pages
const HomePage = lazyImport(() => import('../pages/HomePage'));
const Login = lazyImport(() => import('../pages/auth/Login'));
const Register = lazyImport(() => import('../pages/auth/Register'));
const LegalPage = lazyImport(() =>
  import('../pages/LegalPage').then((module) => ({
    default: module.LegalPage,
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
      { path: '/', element: <HomePage /> },
      { path: '/legal', element: <LegalPage /> },
      { path: '/pricing', element: <PricingPage /> },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '/check-your-email', element: <CheckYourEmail /> },
      { path: '/verify-email', element: <VerifyEmail /> },
      { path: '/set-password', element: <SetPassword /> },

      {
        protected: true,
        layout: <NavLayout />,
        children: [
          { path: '/plaid', element: <Plaid /> },
          { path: '/subscriptions', element: <Subscriptions /> },
          { path: '/cards', element: <Cards /> },
          { path: '/shared-plan', element: <SharedPlan /> },

          {
            path: '/profile',
            element: <ProfileLayout />,
            children: [
              { index: true, element: <Profile /> },
              { path: 'edit', element: <EditProfile /> },
              {
                path: 'change-password',
                element: <ChangePassword />,
              },
              {
                path: 'account-details',
                element: <AccountDetails />,
              },
            ],
          },

          { path: '/settings', element: <Settings /> },
          { path: '/contact', element: <ContactUs /> },
          {
            path: '/notifications',
            element: <NotificationsPage />,
          },
        ],
      },

      { path: '*', element: <NotFound /> },
    ],
  },
];

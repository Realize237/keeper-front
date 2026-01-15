import { ReactNode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { LanguageProvider } from '../context/LanguageContext';
import { UserProvider } from '../context/UserContext';
import { LogoutProvider } from '../context/LogoutContext';
import { PlaidstartProvider } from '../context/PlaidContext';
import { SocketProvider } from '../context/SocketContext';

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  return (
    <LanguageProvider>
      <CookiesProvider>
        <UserProvider>
          <LogoutProvider>
            <PlaidstartProvider>
              <SocketProvider>{children}</SocketProvider>
            </PlaidstartProvider>
          </LogoutProvider>
        </UserProvider>
      </CookiesProvider>
    </LanguageProvider>
  );
}

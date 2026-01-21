import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { TOASTER_OPTIONS } from './constants';
import { AppProviders } from './providers/AppProviders';
import { StartupEffects } from './startup/StartupEffects';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <StartupEffects />
        <AppRoutes />
      </BrowserRouter>

      <Toaster toastOptions={TOASTER_OPTIONS} />
    </AppProviders>
  );
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import App from './App.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '../src/utils/i18n';
import { env } from './utils/env.ts';

interface MutationMeta {
  invalidate?: unknown[][];
}

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      const meta = mutation.meta as MutationMeta;
      if (meta?.invalidate) {
        meta.invalidate.forEach((key: unknown[]) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
    },
  }),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={env.APP_ENV === 'development'} />
    </QueryClientProvider>
  </StrictMode>
);

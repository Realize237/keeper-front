import { use } from 'react';
import { SocketContext } from '../context/SocketContext';

export const useSocket = () => {
  const ctx = use(SocketContext);
  if (!ctx) {
    throw new Error('useSocket must be used inside a <SocketProvider>');
  }
  return ctx;
};

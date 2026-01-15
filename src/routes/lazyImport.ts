import { lazy } from 'react';

export function lazyImport<T extends React.ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(factory);
}

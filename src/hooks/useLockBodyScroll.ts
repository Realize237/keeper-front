import { useEffect } from 'react';

export function useLockBodyScroll(
  isOpen: boolean,
  options: {
    element?: HTMLElement;
    restorePrevious?: boolean;
  } = {}
) {
  const { element = document.body, restorePrevious = false } = options;

  useEffect(() => {
    if (!element) return;

    if (isOpen) {
      element.style.overflow = 'hidden';
    } else {
      if (restorePrevious) {
        const prevOverflow = element.dataset.prevOverflow || '';
        element.style.overflow = prevOverflow;
        delete element.dataset.prevOverflow;
      } else {
        element.style.overflow = '';
      }
    }

    return () => {
      if (restorePrevious) {
        const prevOverflow = element.dataset.prevOverflow || '';
        element.style.overflow = prevOverflow;
        delete element.dataset.prevOverflow;
      } else {
        element.style.overflow = '';
      }
    };
  }, [isOpen, element, restorePrevious]);
}

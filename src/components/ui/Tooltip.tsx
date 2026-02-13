import { useState, useRef, useLayoutEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  offset?: number;
  disabled?: boolean;
}

export function Tooltip({
  content,
  children,
  offset = 8,
  disabled = false,
}: TooltipProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    if (!visible) return;
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const top = triggerRect.top - tooltipRect.height - offset;

    const left =
      triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;

    setPosition({ top, left });
  }, [visible, offset]);

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={() => !disabled && setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="inline-flex"
      >
        {children}
      </span>

      {createPortal(
        <AnimatePresence>
          {visible && (
            <motion.div
              ref={tooltipRef}
              role="tooltip"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="
                fixed z-9999
                rounded-md bg-accent text-primary-foreground text-sm
                px-3 py-2 shadow-lg
                pointer-events-none
              "
              style={{
                top: position.top,
                left: position.left,
              }}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

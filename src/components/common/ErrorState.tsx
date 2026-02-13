import { motion } from 'framer-motion';

type ErrorStateProps = {
  message?: string;
  onRetry: () => void;
};

const ErrorState = ({
  message = 'Something went wrong.',
  onRetry,
}: ErrorStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full py-12 flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="w-14 h-14 rounded-full bg-surface text-surface-foreground flex items-center justify-center mb-4 border border-border"
      >
        ⚠️
      </motion.div>

      <p className="text-foreground-surface text-lg font-medium mb-2">
        {message}
      </p>

      <motion.button
        onClick={onRetry}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-border capitalize rounded-xl text-surface-foreground font-medium tracking-wide 
                   shadow-sm hover:bg-muted transition-all cursor-pointer"
      >
        Retry
      </motion.button>

      <div className="absolute bottom-0 w-36 h-36 opacity-5 rounded-full bg-background blur-3xl"></div>
    </motion.div>
  );
};

export default ErrorState;

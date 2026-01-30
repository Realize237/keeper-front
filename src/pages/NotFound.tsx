import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../components/ui/Button';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="max-w-sm text-center space-y-6"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-6xl font-semibold text-black/80 tracking-tight"
        >
          404
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <h1 className="text-2xl md:text-3xl font-semibold text-black">
            {t('not_found.title')}
          </h1>
          <p className="text-sm text-black/50">{t('not_found.description')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4 pt-4"
        >
          <Button onClick={() => navigate(-1)}>{t('not_found.go_back')}</Button>

          <Button
            variant="secondary-light"
            onClick={() => navigate('/support')}
          >
            {t('not_found.contact_support')}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;

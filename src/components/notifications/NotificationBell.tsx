import { motion } from 'framer-motion';

import { IoIosNotificationsOutline } from 'react-icons/io';

interface Props {
  count?: number;
  onClick?: () => void;
}

const getBadgeValue = (value: number) => {
  return value > 9 ? '9+' : value;
};

const NotificationBell: React.FC<Props> = ({ count = 0, onClick }) => {
  return (
    <motion.div
      className="relative flex justify-center items-center cursor-pointer p-3  rounded-full hover:bg-muted"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <IoIosNotificationsOutline className="text-xl text-foreground" />

      {count > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="
            absolute top-1 right-1 
            bg-primary text-primary-foreground text-xs 
            min-w-4.5 h-4.5 
            flex items-center justify-center 
            rounded-full font-semibold px-1
          "
        >
          {getBadgeValue(count)}
        </motion.div>
      )}
    </motion.div>
  );
};

export default NotificationBell;

import { motion } from 'framer-motion';
import { MdOutlineNotifications } from 'react-icons/md';

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
      className="relative flex justify-center items-center cursor-pointer p-3 bg-[#2f2f2f] rounded-full hover:bg-[#3f3f3f]"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <MdOutlineNotifications className="text-xl text-white" />

      {count > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="
            absolute -top-1 -right-1 
            bg-red-500 text-white text-xs 
            min-w-[18px] h-[18px] 
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

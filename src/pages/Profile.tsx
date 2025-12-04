import {
  FaBell,
  FaChevronLeft,
  FaChevronRight,
  FaCog,
  FaComments,
  FaCreditCard,
  FaEdit,
  FaFileAlt,
  FaQuestionCircle,
  FaShieldAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { type IconType } from "react-icons";

import { useUser } from "../context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomSheet from "../components/ui/BottomSheet";
import { AnimatePresence, motion } from "framer-motion";
import { useLogoutUser } from "../hooks/useUsers";
import { getAvatarInitials } from "../utils";
import Modal from "../components/ui/Modal";
import { useDeviceType } from "../hooks/useDeviceType";

interface MenuItem {
  icon: IconType;
  label: string;
  subtitle?: string;
  path?: string;
  action?: string;
}

const menuItems: MenuItem[] = [
  {
    icon: FaUser,
    label: "Account Details",
    subtitle: "Manage your Account Details",
    path: "/profile/account-details",
  },
  {
    icon: FaCreditCard,
    label: "Payment History",
    subtitle: "View your past orders",

    path: "/cards",
  },
  {
    icon: FaBell,
    label: "Notification",
    subtitle: "",

    path: "/notifications",
  },
  {
    icon: FaCog,
    label: "Settings",
    subtitle: "",

    path: "/settings",
  },
];

const secondaryItems: MenuItem[] = [
  {
    icon: FaComments,
    label: "Contact Us",

    path: "/contact",
  },
  {
    icon: FaFileAlt,
    label: "Teams & condition",

    path: "/terms",
  },
  {
    icon: FaShieldAlt,
    label: "Privacy Policy",

    path: "/privacy",
  },
  {
    icon: FaQuestionCircle,
    label: "Get Help",

    path: "/help",
  },
  {
    icon: FaSignOutAlt,
    label: "Log out",
    action: "logout",
  },
];

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { mutate: logout } = useLogoutUser();
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const { isMobile } = useDeviceType();

  const handleItemClick = (item: MenuItem) => {
    if (item.action === "logout") {
      console.log("clicked");
      setIsLoggingOut(true);
    } else if (item.path) {
      navigate(item.path);
    }
  };
  return (
    <div className="text-white w-11/12 mx-auto py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-2 cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-700 transition"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-bold ml-4">Profile</h3>
      </div>

      <div className="p-3 flex items-center rounded-xl border border-gray-700">
        {user?.photo ? (
          <img
            src={user.photo}
            alt="Profile"
            className="w-12 h-12 object-cover rounded-full"
          />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#CDFF00] text-black font-bold">
            {getAvatarInitials(user?.name || "")}
          </div>
        )}

        <div className="flex w-full justify-between items-center ml-4">
          <div>
            <p className="font-bold text-xl">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
          <button className="p-1 flex items-center cursor-pointer justify-center rounded-full hover:bg-gray-700 transition">
            <FaEdit className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="space-y-2 bg-[#2f2f2f] rounded-2xl mt-8">
        {menuItems.map((item, index) => (
          <motion.button
            key={index}
            onClick={() => handleItemClick(item)}
            className="w-full flex items-center justify-between p-4 rounded-xl cursor-pointer"
            whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-4">
              <item.icon className="w-5 h-5" />
              <div className="text-left">
                <p className="font-semibold">{item.label}</p>
                {item.subtitle && <p className="text-xs">{item.subtitle}</p>}
              </div>
            </div>
            <FaChevronRight className="w-5 h-5" />
          </motion.button>
        ))}
      </div>

      <div className="space-y-2 bg-[#2f2f2f] rounded-2xl mt-8">
        {secondaryItems.map((item, index) => (
          <motion.button
            key={index}
            onClick={() => handleItemClick(item)}
            className="w-full flex items-center justify-between p-4 rounded-xl cursor-pointer"
            whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-4">
              <item.icon className="w-5 h-5" />
              <div className="text-left">
                <p className="font-semibold">{item.label}</p>
              </div>
            </div>
            <FaChevronRight className="w-5 h-5" />
          </motion.button>
        ))}
      </div>

      <BottomSheet
        isOpen={isLoggingOut && isMobile}
        onClose={() => setIsLoggingOut(false)}
      >
        <motion.div>
          <div className="flex font-medium justify-center items-center border-b border-white pb-4 pt-8">
            Logout
          </div>
          <div className="flex flex-col space-y-8">
            <p className="text-center mt-8">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-center gap-10">
              <motion.button
                onClick={() => setIsLoggingOut(false)}
                className="rounded-full cursor-pointer border w-32 p-4 border-white"
                whileHover={{ scale: 1.05, backgroundColor: "#ffffff10" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Cancel
              </motion.button>

              <motion.button
                onClick={() => logout()}
                className="rounded-full  cursor-pointer w-32 p-4 text-white bg-red-500"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 20px rgba(255, 0, 0, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Yes Logout
              </motion.button>
            </div>
          </div>
        </motion.div>
      </BottomSheet>
      <AnimatePresence>
        <Modal
          isOpen={isLoggingOut && !isMobile}
          onClose={() => setIsLoggingOut(false)}
        >
          <motion.div>
            <div className="flex font-medium justify-center items-center border-b border-white pb-4 pt-8">
              Logout
            </div>
            <div className="flex flex-col space-y-8">
              <p className="text-center mt-8">
                Are you sure you want to log out?
              </p>

              <div className="flex justify-center gap-10">
                <motion.button
                  onClick={() => setIsLoggingOut(false)}
                  className="rounded-full cursor-pointer border w-32 p-4 border-white"
                  whileHover={{ scale: 1.05, backgroundColor: "#ffffff10" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  Cancel
                </motion.button>

                <motion.button
                  onClick={() => logout()}
                  className="rounded-full  cursor-pointer w-32 p-4 text-white bg-red-500"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 8px 20px rgba(255, 0, 0, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  Yes Logout
                </motion.button>
              </div>
            </div>
          </motion.div>
        </Modal>
      </AnimatePresence>
    </div>
  );
};

export default Profile;

import { Outlet } from 'react-router-dom';
import BottomNav from '../components/layout/BottomNav/BottomNav';
import { useUser } from '../context/UserContext';
import { useDeviceType } from '../hooks/useDeviceType';
import Sidebar from '../components/layout/Sidebar/Sidebar';
import { useState } from 'react';
import Header from '../components/layout/Header/Header';

export default function NavLayout() {
  const { user } = useUser();
  const { isMobile } = useDeviceType();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  const getMainClasses = () => {
    if (!user || isMobile) return 'flex-1 pb-20';

    const paddingClass = isSidebarOpen ? 'md:pl-60' : 'md:pl-16';
    return `flex-1 pb-20 transition-all duration-300 ${paddingClass}`;
  };

  return (
    <div className="min-h-screen bg-[#171717] flex flex-col">
      <main className={getMainClasses()}>
        <Header />
        <Outlet />
      </main>
      {user && isMobile && <BottomNav />}
      {user && !isMobile && <Sidebar onToggle={handleSidebarToggle} />}
    </div>
  );
}

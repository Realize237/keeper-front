import { Outlet } from 'react-router-dom';
import BottomNav from '../components/layout/BottomNav/BottomNav';
import { useUser } from '../context/UserContext';
import { useDeviceType } from '../hooks/useDeviceType';
import Sidebar from '../components/layout/Sidebar/Sidebar';

export default function NavLayout() {
  const { user } = useUser();
  const { isMobile } = useDeviceType();
  return (
    <div className="min-h-screen bg-[#171717] flex flex-col">
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      {user && isMobile && <BottomNav />}
      {user && !isMobile && <Sidebar />}
    </div>
  );
}

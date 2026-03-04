import { Outlet } from 'react-router-dom';
import HomeNavbar from '../components/homepage/HomeNavbar';
import { Footer } from '../components/homepage/Footer';

const PublicLayout = () => {
  return (
    <>
      <HomeNavbar />
      <div className="h-28" />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;

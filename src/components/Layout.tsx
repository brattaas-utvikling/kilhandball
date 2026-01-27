import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SponsorBanner from './Sponsorbanner';


function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-grow w-11/12 max-w-screen-2xl mx-auto pt-16 md:pt-20 items-center justify-center">
        <Outlet />
      </main>
      <SponsorBanner />
      <Footer />
    </div>
  );
}

export default Layout;

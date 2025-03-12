import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-11/12 max-w-screen-xl mx-auto pt-24 md:pt-28 flex items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

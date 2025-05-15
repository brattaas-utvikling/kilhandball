import { Link } from 'react-router-dom';
import Logo from '../../assets/kil_logo.png';
// import NavBar from '../NavBar';
import DesktopNav from '../DesktopNav/DesktopNav';
import MobileNav from '../MobileNav/MobileNav';

function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-kilred border-b border-white/20">
      <div className="w-10/12 max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={Logo || '/placeholder.svg'}
            alt="KIL logo"
            className="h-12 md:h-14 "
          />
        </Link>
        <DesktopNav />
        <MobileNav />
      </div>
    </nav>
  );
}

export default Header;

// function Header() {
//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-kilred border-b border-white/20">
//       <div className="w-10/12 max-w-screen-2xl mx-auto flex justify-between items-center h-20">
//         <Link to="/" className="flex items-center gap-2 group">
//           <img
//             src={Logo || "/placeholder.svg"}
//             alt="KIL logo"
//             className="h-12 md:h-14 transition-transform duration-300 group-hover:scale-105"
//           />
//         </Link>
//         <NavBar />
//       </div>
//     </header>
//   );
// }

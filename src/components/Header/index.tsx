import { Link } from 'react-router-dom';
import Logo from '../../assets/kil_logo.png';
import NavBar from '../NavBar';

function Header() {
  return (
    <header className="bg-kilred w-full flex items-center fixed h-20 z-50">
      <div className="w-10/12 md:w-11/12 max-w-screen-2xl  mx-auto flex justify-between items-center h-full">
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="KIL logo" className="h-16" />
          </Link>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <NavBar />
        </div>
      </div>
    </header>
  );
}

export default Header;

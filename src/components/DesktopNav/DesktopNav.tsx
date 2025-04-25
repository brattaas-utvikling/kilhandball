import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { navLinks } from '../links/links';

function DesktopNav() {
  return (
    <ul className="hidden md:flex gap-6">
      {navLinks.map(({ path, label }) => (
        <li key={path} className="relative group">
          <NavLink
            to={path}
            className={({ isActive }) =>
              `px-4 py-2 transition-colors duration-300 ${
                isActive ? 'text-red-500' : 'text-white'
              }`
            }
          >
            {label}
            <motion.div
              className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white"
              initial={{ width: 0, x: '-50%' }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default DesktopNav;

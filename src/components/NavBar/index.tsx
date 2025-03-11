import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import NavLinks from '../NavLinks';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    if (menuOpen) {
      menuRef.current?.focus();
    }
  }, [menuOpen]);

  return (
    <>
      <nav className="z-50">
        {/* Hamburger button */}
        <button
          className="text-hover text-2xl md:hidden transition-transform duration-500 text-white"
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        {/* AnimatePresence sørger for smooth enter/exit */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              tabIndex={-1}
              className="absolute top-20 left-0 right-0 bg-kilred p-4 flex flex-col items-center gap-4 md:flex md:flex-row md:static md:gap-6 focus:outline-none"
              onKeyDown={(e) => e.key === 'Escape' && setMenuOpen(false)}
            >
              <NavLinks toggleMenu={toggleMenu} />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Bakgrunn som lukker menyen ved klikk */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setMenuOpen(false)} // Lukk menyen ved klikk utenfor
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavBar;

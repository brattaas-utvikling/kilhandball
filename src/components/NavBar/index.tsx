// import { useState, useRef, useEffect } from 'react';
// import { Menu, X } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import NavLinks from '../navLinks';

// function NavBar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement | null>(null);

//   function toggleMenu() {
//     setMenuOpen((prev) => !prev);
//   }

//   useEffect(() => {
//     function handleResize() {
//       if (window.innerWidth >= 768) {
//         setMenuOpen(true);
//       } else {
//         setMenuOpen(false);
//       }
//     }

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target as Node) &&
//         window.innerWidth < 768
//       ) {
//         setMenuOpen(false);
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <>
//       <button
//         className="text-white md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
//         onClick={toggleMenu}
//         aria-label={menuOpen ? 'Lukk meny' : 'Åpne meny'}
//         aria-expanded={menuOpen}
//       >
//         {menuOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       <AnimatePresence>
//         {(menuOpen || window.innerWidth >= 768) && (
//           <motion.div
//             ref={menuRef}
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.3 }}
//             className={`
//               absolute top-20 left-0 right-0 bg-kilred/95 backdrop-blur-md border-b border-white/10 shadow-lg
//               md:static md:bg-transparent md:shadow-none md:border-none
//             `}
//           >
//             <NavLinks toggleMenu={toggleMenu} />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// export default NavBar;

// import { useState, useRef, useEffect } from 'react';
// import { Menu, X } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import NavLinks from '../NavLinks';

// function NavBar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement | null>(null);

//   function toggleMenu() {
//     setMenuOpen(!menuOpen);
//   }

//   // useEffect(() => {
//   //   if (menuOpen) {
//   //     menuRef.current?.focus();
//   //   }
//   // }, [menuOpen]);

//   // 💡 Oppdater menyen når vindusstørrelsen endres
//   useEffect(() => {
//     function handleResize() {
//       if (window.innerWidth >= 768) {
//         setMenuOpen(true); // Alltid åpen i desktop-modus
//       } else {
//         setMenuOpen(false); // Starter lukket i mobil-modus
//       }
//     }

//     handleResize(); // Kjør én gang ved innlasting
//     window.addEventListener('resize', handleResize);

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Close menu when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node) && window.innerWidth < 768) {
//         setMenuOpen(false);
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [menuRef]);

//   return (
// <>
//       <button
//         className="text-white md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
//         onClick={toggleMenu}
//         aria-label={menuOpen ? 'Close menu' : 'Open menu'}
//         aria-expanded={menuOpen}
//       >
//         {menuOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       <AnimatePresence>
//         {(menuOpen || window.innerWidth >= 768) && (
//           <motion.div
//             ref={menuRef}
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2, ease: 'easeOut' }}
//             className={`
//               absolute top-20 left-0 right-0 bg-kilred/95 backdrop-blur-md border-b border-white/10 shadow-lg
//               md:shadow-none md:border-none md:static md:bg-transparent md:backdrop-filter-none
//             `}
//           >
//             <NavLinks toggleMenu={toggleMenu} />

//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// export default NavBar;

/*     <>
      <nav className="z-50">
        <button
          className="text-hover text-2xl md:hidden transition-transform duration-500 text-white"
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <AnimatePresence>
          {(menuOpen || window.innerWidth >= 768) && ( // Sørger for at menyen vises på desktop
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              tabIndex={-1}
              className={`absolute top-20 left-0 right-0 bg-kilred flex flex-col items-center gap-4 focus:outline-none 
        md:flex md:flex-row md:static md:gap-6`}
              onKeyDown={(e) => e.key === 'Escape' && setMenuOpen(false)}
            >
              <NavLinks toggleMenu={toggleMenu} />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>


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
    </> */

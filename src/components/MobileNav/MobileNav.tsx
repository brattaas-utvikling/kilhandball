import { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../links/links';
import { Menu, X } from 'lucide-react';
import { useOutsideClick } from '../../hooks/useOutsideClick';

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    if (isOpen) setIsOpen(false);
  }, [isOpen]);

  const navRef = useOutsideClick(handleClose);

  const menuVariants = {
    closed: {
      clipPath: 'inset(0% 0% 100% 0%)',
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    open: {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeInOut', staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 90 },
  };

  return (
    <div className="md:hidden " ref={navRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white w-full relative"
        aria-label={isOpen ? 'Lukk meny' : 'Åpne meny'}
        aria-expanded={isOpen}
        animate={isOpen ? 'open' : 'closed'}
        variants={iconVariants}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute top-16 left-0 w-full bg-kilred text-white flex flex-col items-center shadow-sm"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map(({ path, label }) => (
              <motion.li
                key={path}
                className="py-2 px-4 w-full"
                variants={itemVariants}
              >
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `block w-full text-lg text-center py-2 rounded ${
                      isActive
                        ? 'bg-white text-kilred font-semibold'
                        : 'text-white hover:bg-white/10'
                    }`
                  }
                  onClick={handleClose}
                >
                  {label}
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileNav;

// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { navLinks } from '../links/links';
// import { Menu, X } from 'lucide-react';

// function MobileNav() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="md:hidden">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="text-white w-full"
//         aria-label={isOpen ? 'Lukk meny' : 'Åpne meny'}
//         aria-expanded={isOpen}
//       >
//         {isOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.ul
//             className="absolute top-16 left-0 w-full bg-kilred text-white flex flex-col items-center shadow-sm"
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             {navLinks.map(({ path, label }) => (
//               <li key={path} className="py-2 px-4 w-full">
//                 <NavLink
//                   to={path}
//                   className={({ isActive }) =>
//                     `block w-full text-lg text-center py-2 rounded ${
//                       isActive
//                         ? 'bg-white text-kilred font-semibold'
//                         : 'text-white hover:bg-white/10'
//                     }`
//                   }
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {label}
//                 </NavLink>
//               </li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default MobileNav;

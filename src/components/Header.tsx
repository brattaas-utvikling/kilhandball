import { useState, useCallback, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { useIsMobile } from '../hooks/useIsMobile';
import { navLinks } from './navLinks';
import Logo from '../assets/kil_logo.png';

// Throttle utility
function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
  //   const saved = localStorage.getItem("darkMode");
  //   if (saved !== null) return JSON.parse(saved);
  //   return false;
  // });
  const [lastScrollY, setLastScrollY] = useState(0);

  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleClose = useCallback(() => {
    if (isMenuOpen) setIsMenuOpen(false);
  }, [isMenuOpen]);

  const navRef = useOutsideClick(handleClose);

  // Handle scroll behavior
  const handleScroll = useCallback(() => {
    const header = headerRef.current;
    if (!header) return;

    const currentScrollY = window.scrollY;

    // Don't hide navbar on desktop
    if (!isMobile) {
      header.style.transform = "translateY(0)";
      return;
    }

    // Avoid excessive updates
    if (Math.abs(currentScrollY - lastScrollY) < 10) return;

    // Hide on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.style.transform = "translateY(-100%)";
      setIsMenuOpen(false);
    } else {
      header.style.transform = "translateY(0)";
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY, isMobile]);

  const throttledScrollHandler = useCallback(
    () => throttle(handleScroll, 16),
    [handleScroll],
  );

  // Setup scroll listener
  useEffect(() => {
    window.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", throttledScrollHandler);
  }, [throttledScrollHandler]);

  // Handle dark mode
  // useEffect(() => {
  //   localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  //   document.documentElement.classList.toggle("dark", isDarkMode);
  // }, [isDarkMode]);

  // Handle body scroll lock for mobile menu
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isMobile]);

  // Handle navigation
  const handleNavClick = useCallback(
    (href: string) => {
      setIsMenuOpen(false);

      if (href === "/" && location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(href);
      }
    },
    [location.pathname, navigate],
  );

  // Menu animations
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
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-kilred backdrop-blur-md border-b border-white/20 transition-all duration-300 ease-in-out"
    >
      <nav className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          
          {/* Logo */}
          <motion.div whileTap={{ scale: 0.98 }}>
            <Link 
              to="/" 
              className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-kilred rounded-lg"
              onClick={() => handleNavClick("/")}
            >
              <img
                src={Logo}
                alt="KIL logo"
                className="h-12 md:h-14 transition-transform duration-200 group-hover:scale-105"
                loading="eager"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-6">
            {navLinks.map(({ path, label }, index) => (
              <motion.li 
                key={path} 
                className="relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `px-1 md:px-1.5 lg:px-4 py-2 text-sm font-roboto font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-kilred ${
                      isActive 
                        ? 'text-white font-extrabold underline underline-offset-4' 
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`
                  }
                  onClick={() => handleNavClick(path)}
                >
                  {label}
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white"
                    initial={{ width: 0, x: '-50%' }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </NavLink>
              </motion.li>
            ))}
          </ul>

            {/* Mobile menu button */}
            <div className="md:hidden" ref={navRef}>
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-kilred"
                aria-label={isMenuOpen ? 'Lukk meny' : 'Åpne meny'}
                aria-expanded={isMenuOpen}
                animate={isMenuOpen ? 'open' : 'closed'}
                variants={iconVariants}
                transition={{ duration: 0.2 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMenuOpen ? (
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

              {/* Mobile menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.ul
                    className="absolute top-16 left-0 w-full bg-kilred text-white flex flex-col items-center shadow-lg border-t border-white/20"
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
                            `block w-full text-lg text-center py-3 rounded-lg font-roboto transition-all duration-200 ${
                              isActive
                                ? 'bg-white text-kilred font-semibold'
                                : 'text-white hover:bg-white/10'
                            }`
                          }
                          onClick={() => handleNavClick(path)}
                        >
                          {label}
                        </NavLink>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

// import { Link } from 'react-router-dom';
// import Logo from '../../assets/kil_logo.png';
// // import NavBar from '../NavBar';
// import DesktopNav from '../DesktopNav/DesktopNav';
// import MobileNav from '../MobileNav/MobileNav';

// function Header() {
//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-kilred border-b border-white/20">
//       <div className="w-10/12 max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         <Link to="/" className="flex items-center gap-2 group">
//           <img
//             src={Logo || '/placeholder.svg'}
//             alt="KIL logo"
//             className="h-12 md:h-14 "
//           />
//         </Link>
//         <DesktopNav />
//         <MobileNav />
//       </div>
//     </nav>
//   );
// }

// export default Header;

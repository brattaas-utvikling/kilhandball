import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaHandFist } from 'react-icons/fa6';
import spondLogo from '/assets/spond-hvit.svg';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const socials = [
  {
    name: 'Spond',
    handle: 'Ta kontakt for tilgang',
    url: '/kontakt',
    icon: (
      <img
        src={spondLogo}
        alt="Spond"
        className="w-6 h-6 object-contain"
      />
    ),
    gradient: 'from-[#EA2A60] to-[#ED4B35]',
  },
  {
    name: 'Instagram',
    handle: '@kilhandball',
    url: 'https://www.instagram.com/kilhandball/',
    icon: <InstagramIcon />,
    gradient: 'from-[#f09433] via-[#dc2743] to-[#bc1888]',
  },
  {
    name: 'Facebook',
    handle: 'KIL Håndball',
    url: 'https://www.facebook.com/profile.php?id=61574599328594',
    icon: <FacebookIcon />,
    gradient: 'from-[#1877F2] to-[#0c5fcb]',
  },
];

const SosialeMedier: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center h-full w-full px-2 py-6 md:py-0"
    >
      <div className="w-full max-w-sm md:max-w-md">

        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-6">
          <p className="text-white/60 font-roboto text-xs uppercase tracking-[0.2em] mb-2">
            Følg oss
          </p>
          <h3 className="font-anton font-semibold text-white text-2xl md:text-3xl tracking-wide leading-tight">
            HOLD DEG OPPDATERT
          </h3>
          <p className="text-white/75 font-roboto text-sm md:text-base mt-2 leading-relaxed">
          Vi bruker Spond til kommunikasjon med trenere, lagledere og spillere. Er du trener og mangler tilgang til gruppen, ta kontakt via lenken under.
          Følg oss gjerne på sosiale medier — der deler vi kamper, nyheter og det som ellers skjer i klubben.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6"
        />

        {/* Social links */}
        <div className="space-y-3">
          {socials.map((social) => (
            <motion.a
              key={social.name}
              variants={itemVariants}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="group flex items-center gap-4 w-full px-4 py-3.5 cursor-pointer"
            >
              {/* Icon */}
              <div className={`
                flex-shrink-0 w-10 h-10 rounded-lg
                bg-gradient-to-br ${social.gradient}
                flex items-center justify-center text-white shadow-lg
              `}>
                {social.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-roboto font-semibold text-sm leading-none mb-0.5">
                  {social.name}
                </p>
                <p className="text-white/60 font-roboto text-xs truncate">
                  {social.handle}
                </p>
              </div>

              {/* Arrow */}
              <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors flex-shrink-0" />
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          variants={itemVariants}
          className="text-center text-white/40 font-roboto text-xs mt-5 flex items-center justify-center gap-1.5"
        >
          Kamper tilbake over sommeren
          <FaHandFist className="w-4 h-4" />
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SosialeMedier;
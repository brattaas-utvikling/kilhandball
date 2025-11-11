export const navLinks = [
  { path: '/', label: 'Hjem' },
  { path: '/lag', label: 'Lag' },
  { path: '/treningstider', label: 'Treninger' },
  // { path: '/kamper', label: 'Kamper' },
  { path: '/praktisk-info', label: 'Praktisk info' },
  { path: '/nyheter', label: 'Nyheter' },
  { path: '/om-oss', label: 'Om oss' },
  { path: '/kontakt', label: 'Kontakt' },
];

// import { NavLink } from 'react-router-dom';

// function NavLinks({ toggleMenu }: { toggleMenu: () => void }) {
//   const links = [
//     { path: '/', label: 'Hjem' },
//     { path: '/om-oss', label: 'Om oss' },
//     { path: '/treningstider', label: 'Treningstider' },
//     { path: '/praktisk-info', label: 'Praktisk info' },
//     { path: '/kontakt', label: 'Kontakt' },
//   ];
  

//   return (
//     <ul className="flex flex-col items-center text-center py-4 gap-4 md:gap-6 md:flex-row md:items-center md:justify-end">
//       {links.map(({ path, label }) => {
//         // Remove the declaration and assignment of isActive since it is not being used

//         return (
//           <li key={path} className="w-full md:w-auto">
//             <NavLink
//               to={path}
//               onClick={toggleMenu}
//               className={({ isActive }) =>
//                 `
//                 block w-full md:w-auto px-4 py-2 rounded transition-colors duration-300
//                 ${
//                   isActive
//                     ? 'bg-white text-kilred md:bg-transparent md:text-white/70'
//                     : 'text-white hover:text-white/90'
//                 }
//               `
//               }
//             >
//               {label}
//             </NavLink>
//           </li>
//         );
//       })}
//     </ul>
//   );
// }

// export default NavLinks;

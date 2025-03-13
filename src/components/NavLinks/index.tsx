import { NavLink } from 'react-router-dom';

function NavLinks({ toggleMenu }: { toggleMenu: () => void }) {
  return (
    <ul className="flex flex-col mt-7 w-full d:mt-0 md:flex-row gap-4 md:gap-6 md:items-center">
      {[
        { path: '/', label: 'Hjem' },
        { path: '/om-oss', label: 'Om oss' },
        { path: '/kontakt', label: 'Kontakt' },
      ].map(({ path, label }) => (
        <li key={path}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              `block w-full text-center font-roboto text-lg px-4 py-2 transition-all duration-100
              ${isActive
                ? 'md:text-white md:rounded-lg md:border-b-2 md:border-e-2 md:border-white md:bg-transparent bg-white text-kilred'
                : 'text-white hover:bg-white hover:text-kilred md:hover:bg-transparent md:hover:text-white md:hover:rounded-lg md:hover:border-b-2 md:hover:border-e-2 md:hover:border-white'
              }`
            }
            onClick={() => toggleMenu()}
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default NavLinks;


// import { NavLink } from 'react-router-dom';

// function NavLinks({ toggleMenu }: { toggleMenu: () => void }) {
//   return (
//     <ul className="flex flex-col mt-7 md:mt-0 md:flex-row gap-4 md:gap-6 md:items-center ">
//       <li>
//         <NavLink
//           to="/"
//           className="text-white font-roboto text-lg hover:bg-white hover:text-kilred transition-colors duration-200"
//           onClick={() => toggleMenu()}
//         >
//           Hjem
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/om-oss"
//           className="text-white font-roboto text-lg hover:bg-white hover:text-kilred transition-colors duration-200"
//           onClick={() => toggleMenu()}
//         >
//           Om oss
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/praktisk-info"
//           className="text-white font-roboto text-lg hover:bg-white hover:text-kilred transition-colors duration-200"
//           onClick={() => toggleMenu()}
//         >
//           Praktisk info
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/kontakt/"
//           className="text-white font-roboto text-lg hover:bg-white hover:text-kilred transition-colors duration-200"
//           onClick={() => toggleMenu()}
//         >
//           Kontakt
//         </NavLink>
//       </li>
//     </ul>
//   );
// }

// export default NavLinks;

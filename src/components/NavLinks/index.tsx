import { NavLink } from 'react-router-dom';

function NavLinks({ toggleMenu }: { toggleMenu: () => void }) {
  return (
    <ul className="flex flex-col mt-7 w-full md:mt-0 md:flex-row gap-4 md:gap-6 md:items-center">
      {[
        { path: '/', label: 'Hjem' },
        { path: '/om-oss', label: 'Om oss' },
        { path: '/praktisk-info', label: 'Praktisk info' },
        { path: '/kontakt', label: 'Kontakt' },
      ].map(({ path, label }) => (
        <li key={path}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              `block w-full text-center font-roboto after:text-lg px-4 py-2 transition-all duration-100 md:h-full md:flex md:items-center
              ${
                isActive
                  ? ' md:rounded-lg md:border-b-2 md:border-t-0 md:border-white md:bg-kilred md:text-white bg-white text-kilred'
                  : 'text-white hover:bg-white hover:text-kilred md:hover:bg-transparent md:hover:text-white md:hover:rounded-lg md:hover:border-b-2 md:hover:border-t-0 md:hover:border-white'
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

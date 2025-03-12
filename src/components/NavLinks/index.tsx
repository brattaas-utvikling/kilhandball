import { NavLink } from 'react-router-dom';

function NavLinks({ toggleMenu }: { toggleMenu: () => void }) {
  return (
    <ul className="flex flex-col mt-7 md:mt-0 md:flex-row gap-4 md:gap-6 md:items-center ">
      <li>
        <NavLink
          to="/"
          className="text-white font-ingress text-lg hover:bg-white hover:text-kilred transition-colors duration-200"
          onClick={() => toggleMenu()}
        >
          Hjem
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/om-oss"
          className="text-white font-ingress text-lg hover:bg-white hover:text-kilred transition-colors duration-200"
          onClick={() => toggleMenu()}
        >
          Om oss
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/kontakt/"
          className="text-white font-ingress text-lg hover:bg-white hover:text-kilred transition-colors duration-200"
          onClick={() => toggleMenu()}
        >
          Kontakt
        </NavLink>
      </li>
    </ul>
  );
}

export default NavLinks;

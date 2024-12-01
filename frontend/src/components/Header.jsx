import Container from "./Container";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

import { NavLink } from "react-router-dom";


const Header = () => {
  return (
    <header className="py-6 bg-slate-800 text-slate-400 uppercase">
      <Container>
        <ul className="flex gap-4 items-baseline">
          <li className="mr-auto">
            <NavLink
              to={"/"}
              className={({ isActive }) => {
                return isActive ? "text-slate-50" : "hover:text-slate-50";
              }}
            >
              <h1 className="text-2xl tracking-widest font-bold">SwiftCart</h1>
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/cart"}
              className={({ isActive }) => {
                return isActive
                  ? "flex items-center gap-1 text-slate-50"
                  : "flex items-center gap-1 hover:text-slate-50";
              }}
            >
              <FaShoppingCart />
              <span>Cart</span>
            </NavLink>
          </li>

          <li className="flex items-center gap-1">
            <NavLink
              to={"/signin"}
              className={({ isActive }) => {
                return isActive
                  ? "flex items-center gap-1 text-slate-50"
                  : "flex items-center gap-1 hover:text-slate-50";
              }}
            >
              <FaUser />
              <span>Sign in</span>
            </NavLink>
          </li>
        </ul>
      </Container>
    </header>
  );
};

export default Header;

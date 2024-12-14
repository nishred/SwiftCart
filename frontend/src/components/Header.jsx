import Container from "./Container";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { removeUser } from "../slices/userSlice";

import { Link } from "react-router-dom";

const Header = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState(false);

  const ref = useRef();

  const userExists = Object.keys(user).length > 0;

  useEffect(() => {
    if (showDropdown) {
      function handleClickOutside(e) {
        const compute = ref.current.contains(e.target);

        if (!compute) setShowDropdown(false);
      }

      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [showDropdown]);

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

          {!userExists && (
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
          )}
          {userExists && (
            <li
              className="hover:text-slate-100 cursor-pointer flex items-center relative"
              onClick={(e) => {
                setShowDropdown((prev) => !prev);
                e.stopPropagation();
              }}
            >
              <div>{user.name}</div>

              <span>
                <IoMdArrowDropdown />
              </span>

              {showDropdown && (
                <div
                  ref={ref}
                  className="absolute top-full bg-slate-200 text-slate-600 border border-solid left-0 right-0 flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
    
                  <Link to={"/profile"} className="py-1 hover:bg-slate-800 text-center text-md capitalize">Profile</Link>
                  <button
                    className="py-1 hover:bg-slate-800"
                    onClick={() => {
                      dispatch(removeUser());
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </Container>
    </header>
  );
};

export default Header;

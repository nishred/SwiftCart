import Container from "./Container";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { removeUser } from "../slices/userSlice";

import Dropdown from "./Dropdown";

import { Link } from "react-router-dom";

const Header = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState(false);

  const [showAdminDropdown, setShowAdminDropdown] = useState(false);

  useEffect(() => {
    if (showDropdown) setShowAdminDropdown(false);
  }, [showDropdown]);

  useEffect(() => {
    if (showAdminDropdown) setShowDropdown(false);
  }, [showAdminDropdown]);

  const userExists = user.isAuthenticated;

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
          {!user.isAdmin && (
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
          )}

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
                <Dropdown setDropdown={setShowDropdown}>
                  <Dropdown.DropdownLink to={"/profile"}>
                    Profile
                  </Dropdown.DropdownLink>

                  {!user.isAdmin && (
                    <Dropdown.DropdownLink to={"/orders"}>
                      Orders
                    </Dropdown.DropdownLink>
                  )}

                  <Dropdown.DropdownButton
                    onClick={() => {
                      dispatch(removeUser());
                    }}
                  >
                    Logout
                  </Dropdown.DropdownButton>
                </Dropdown>
              )}
            </li>
          )}

          {user.isAdmin && (
            <li
              className="hover:text-slate-100 cursor-pointer flex items-center relative"
              onClick={(e) => {
                setShowAdminDropdown((prev) => !prev);
                e.stopPropagation();
              }}
            >
              <span>ADMIN</span>
              <span>
                <IoMdArrowDropdown />
              </span>

              {showAdminDropdown && (
                <Dropdown setDropdown={setShowAdminDropdown}>
                  <Dropdown.DropdownLink to={"/userlist"}>
                    Users
                  </Dropdown.DropdownLink>

                  <Dropdown.DropdownLink>Orders</Dropdown.DropdownLink>

                  <Dropdown.DropdownLink to={"/productlist"}>Products</Dropdown.DropdownLink>
                </Dropdown>
              )}
            </li>
          )}
        </ul>
      </Container>
    </header>
  );
};

export default Header;

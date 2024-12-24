import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useRef } from "react";

const DropdownLink = styled(Link)`
  padding: 4px 0px;
  text-align: center;
  font-size: small;

  text-transform: uppercase;

  &:hover {
    background-color: #1e293b;
  }
`;

const DropdownButton = styled.button`
  padding: 4px 0px;

  &:hover {
    background-color: #1e293b;
  }
`;

const Dropdown = ({ children, setDropdown }) => {
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (!ref.current.contains(e.target)) setDropdown(false);
    }

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute top-full bg-slate-200 text-slate-600 border border-solid left-0 right-0 flex flex-col z-50"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

Dropdown.DropdownButton = DropdownButton;
Dropdown.DropdownLink = DropdownLink;

export default Dropdown;

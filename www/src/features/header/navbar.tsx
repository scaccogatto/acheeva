import Logo from "@assets/logo.svg?react";
import { Link } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="mb-52 sm:mb-32 flex justify-start items-baseline">
      <NavLink to="/">
        <Logo />
        cheeva
      </NavLink>
      <div className="flex gap-7 ml-16">
        <NavLink to="/">
          <Link className="text-indigo-300">Home</Link>
        </NavLink>
        <NavLink to="/team">
          <Link className="text-indigo-300">Team</Link>
        </NavLink>
        <NavLink to="/demo">
          <Link className="text-indigo-300">Demo</Link>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;

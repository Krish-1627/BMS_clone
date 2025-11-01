
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const activeLinkClass = "text-bms-red";
  const inactiveLinkClass = "hover:text-bms-red transition-colors";

  return (
    <header className="bg-bms-charcoal shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-bms-red tracking-wider">
          BookMyDemo
        </Link>
        <div className="flex items-center space-x-6 text-sm font-medium text-gray-300">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}
          >
            Home
          </NavLink>
          <NavLink
            to="/my-bookings"
            data-test="my-bookings-link"
            className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}
          >
            My Bookings
          </NavLink>
          <NavLink
            to="/dev/integrations"
            className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}
          >
            Dev Tools
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

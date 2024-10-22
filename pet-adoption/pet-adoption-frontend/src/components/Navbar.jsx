import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Assuming AuthContext is set up

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useContext(AuthContext); // Get the current user from AuthContext

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMenuItemClick = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold">Pet Adoption</Link>
      </div>

      {/* Dropdown for small screens */}
      <div className="dropdown dropdown-end md:hidden">
        <label
          tabIndex={0}
          className="btn btn-square btn-ghost"
          onClick={handleDropdownToggle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        {dropdownOpen && (
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link to="/" onClick={handleMenuItemClick}>Home</Link></li>
            <li><Link to="/about" onClick={handleMenuItemClick}>About Us</Link></li>
            <li><Link to="/contact" onClick={handleMenuItemClick}>Contact Us</Link></li>
            {user ? (
              <li><Link to="/admin" onClick={handleMenuItemClick}>Admin Dashboard</Link></li>
            ) : (
              <li><Link to="/login" onClick={handleMenuItemClick}>Login</Link></li>
            )}
          </ul>
        )}
      </div>

      {/* Menu for larger screens */}
      <div className="hidden md:flex flex-none">
        <ul className="menu menu-horizontal p-0">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          {user ? (
            <li><Link to="/admin">Admin Dashboard</Link></li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

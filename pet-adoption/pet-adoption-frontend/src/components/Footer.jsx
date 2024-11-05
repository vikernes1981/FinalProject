// Footer.js
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";
import logo from '/logo.svg'; // Import the logo

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-2 relative">
      <div className="max-w-7xl mx-auto px-4 md:flex md:justify-between text-sm relative z-10">
        
        {/* Left Section - Logo and Links */}
          <div className="mb-3 md:mb-0 md:mr-4">
            <h2 className="text-lg font-bold mb-2">Pawsome Homes</h2>
            <p className="mb-2">Your one-stop place to find a new best friend!</p>
            <nav className="flex flex-col space-y-1">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/about" className="hover:underline">About Us</Link>
              <Link to="/contact" className="hover:underline">Contact</Link>
              <a href="#adopt-pet-section" className="hover:underline">Adopt a Pet</a>
            </nav>
          </div>

          {/* Center Section - Contact */}
          <div className="mb-3 md:mb-0 md:mr-4">
            <h3 className="text-md font-semibold mb-1">Contact Us</h3>
            <p>Email: <a href="mailto:info@pawsomehomes.com" className="hover:underline">info@pawsomehomes.com</a></p>
            <p>Phone: +1 (234) 567-8900</p>
            <p>Address: 123 Pet Street, City, Country</p>
          </div>

          {/* Right Section - Social Media */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-md font-semibold mb-1">Follow Us</h3>
          <div className="flex space-x-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-500">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-400">
              <FaTwitter />
            </a>
            <a href="mailto:info@pawsomehomes.com" className="text-xl hover:text-gray-400">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Logo in the middle */}
<div className="absolute inset-0 flex justify-center items-center opacity-30 p-4">
  <img
    src={logo}
    alt="Pawsome Homes Logo"
    className="h-[100%] w-auto max-h-[100%] max-w-[90%]"
  />
</div>



      {/* Bottom Section - Copyright */}
      <div className="text-center mt-3 border-t border-gray-700 pt-2 text-s relative z-10">
        <p>&copy; {new Date().getFullYear()} Pawsome Homes. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
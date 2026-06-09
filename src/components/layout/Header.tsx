"use client";

import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
const SRZFilms = "/assets/SRZ-Films.png";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed z-50 flex items-center justify-between w-full px-4 md:px-0">
      <div className="container flex items-center justify-between mx-auto p-2 md:p-0 rounded-b-lg md:rounded-none">
        <div className="flex items-center">
          <div className="flex items-center justify-center text-white cursor-pointer">
            <img onClick={() => {window.location.href = "#home"}} src={SRZFilms} alt="SRZ Films Logo" className="w-24 md:w-auto h-auto md:h-28" />
          </div>
        </div>
        
        {/* Desktop Nav */}
        <nav className="justify-end w-full hidden md:flex">
          <ul className="flex justify-center space-x-8">
            <li>
              <a
                href="#home"
                className="relative font-bold text-gray-100 hover:text-white group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                className="relative font-bold text-gray-100 hover:text-white group"
              >
                Portfolio
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="relative font-bold text-gray-100 hover:text-white group"
              >
                Contact Us
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </a>
            </li>
            <li>
              <a
                href="#about-me"
                className="relative font-bold text-gray-100 hover:text-white group"
              >
                About Us
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center pr-2">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white text-2xl focus:outline-none cursor-pointer">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md flex flex-col items-center py-6 space-y-6 md:hidden border-t border-gray-800">
          <a onClick={() => setIsMobileMenuOpen(false)} href="#home" className="text-xl font-bold text-gray-100 hover:text-white">Home</a>
          <a onClick={() => setIsMobileMenuOpen(false)} href="#portfolio" className="text-xl font-bold text-gray-100 hover:text-white">Portfolio</a>
          <a onClick={() => setIsMobileMenuOpen(false)} href="#contact" className="text-xl font-bold text-gray-100 hover:text-white">Contact Us</a>
          <a onClick={() => setIsMobileMenuOpen(false)} href="#about-me" className="text-xl font-bold text-gray-100 hover:text-white">About Us</a>
        </div>
      )}
    </header>
  );
};

export default Header;

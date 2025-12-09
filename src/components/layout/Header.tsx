import React from "react";
import srzLogo from "../../assets/SRZ-Films.png"

const Header: React.FC = () => {
  return (
    <header className="fixed z-50 flex items-center justify-between w-full">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center">
          <div className="flex items-center justify-center text-white ">
            <img src={srzLogo} alt="SRZ Films Logo" className="w-full h-26" />
          </div>
        </div>
        <nav className="flex justify-end w-full">
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
      </div>
    </header>
  );
};

export default Header;

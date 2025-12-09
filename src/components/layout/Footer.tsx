import React from "react";
import { FaFacebook, FaInstagram, FaPhoneAlt, FaYoutube } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-10 pb-5">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold mb-10">
          We develop & create <br /> digital future.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-5 mb-5">
          <div>
            <h3 className="text-xl font-bold mb-4">Address</h3>
            <p className="text-gray-400">Bangladesh —</p>
            <p className="text-gray-400"> 12/27 Sir Sayeed Road ,</p>
            <p className="text-gray-400">Mohammadpur , Dhaka</p>
          </div>

          <div className="flex flex-col text-gray-400 space-y-2">
            <h3 className="text-xl font-bold mb-4 text-white">Say Hello</h3>

            <span className="hover:text-gray-200 transition-colors flex items-center">
              <IoMdMail className="mr-2" />
              <a
                href="mailto:sheikhriaz.srz@gmail.com"
                className="text-gray-400 hover:text-gray-200 transition-colors mb-1"
              >
                sheikhriaz.srz@gmail.com
              </a>
            </span>

            <span className="hover:text-gray-200 transition-colors flex items-center">
              <FaPhoneAlt className="mr-2" />

              <a
                href="tel:+8801617776571"
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                +8801617-776571
              </a>
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Socials</h3>
            <ul>
              <li className="mb-2 flex items-center text-gray-400">
                <span className="hover:text-gray-200 transition-colors flex items-center">
                  <FaFacebook className="mr-2" />
                  <a
                    target="_blank"
                    href="https://www.facebook.com/sheikh.riaz.313096"
                    className="hover:text-gray-200 transition-colors"
                  >
                    Facebook
                  </a>
                </span>
              </li>

              <li className="mb-2 flex items-center text-gray-400">
                <span className="hover:text-gray-200 transition-colors flex items-center">
                  <FaInstagram className="mr-2" />
                  <a
                    target="_blank"
                    href="https://www.instagram.com/srz.official1"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </span>
              </li>
              <li className="mb-2 flex items-center text-gray-400">
                <span className="hover:text-gray-200 transition-colors flex items-center">
                  <FaYoutube className="mr-2" />
                  <a
                    target="_blank"
                    href="https://www.youtube.com/@letsgo.beyond"
                    className="hover:text-white transition-colors"
                  >
                    YouTube
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <div className="flex items-center border-b border-gray-400 pb-2 mb-4">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="bg-transparent border-none outline-none text-gray-400 w-full"
              />
              <button className="ml-2 text-gray-400 text-xl hover:text-white">
                →
              </button>
            </div>
            <label className="flex items-center text-gray-400 text-sm">
              <input type="checkbox" className="mr-2" />I agree to the{" "}
              <a href="#" className="underline ml-1">
                Privacy Policy
              </a>
              .
            </label>
          </div>
        </div>

        <div className="text-gray-300 text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <p>SRZ Films © {new Date().getFullYear()}. All Rights Reserved.</p>
          <p>
            Develop by{" "}
            <a
              href="http://www.facebook.com/Eex.Raf"
              className="text-gray-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              RAFIUL ISLAM
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

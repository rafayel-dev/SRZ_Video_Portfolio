import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useGetFooterQuery } from "../../store/api/appApi";

const Footer: React.FC = () => {
  const { data, isLoading, isError } = useGetFooterQuery();

  if (isLoading) {
    return (
      <footer className="bg-black text-white py-10 text-center">
        Loading footer...
      </footer>
    );
  }

  if (isError || !data?.success) {
    return (
      <footer className="bg-black text-white py-10 text-center">
        Failed to load footer
      </footer>
    );
  }

  const footer = data.data;

  return (
    <footer className="bg-black text-white pt-12 pb-6 px-6 lg:px-0">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 md:mb-10 text-center md:text-left">
          We develop & create <br className="hidden md:inline" /> digital future.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 border-b border-gray-700 pb-10 mb-6 text-center sm:text-left">
          {/* ADDRESS */}
          <div>
            <h3 className="text-xl font-bold mb-4">Address</h3>
            <div
              className="text-gray-400"
              dangerouslySetInnerHTML={{ __html: footer.address.fullAddress }}
            />
          </div>

          {/* EMAIL AND PHONE */}
          <div className="flex flex-col text-gray-400 space-y-2 items-center sm:items-start">
            <h3 className="text-xl font-bold mb-4 text-white">
              Say Hello
            </h3>

            <span className="hover:text-gray-200 transition-colors flex items-center">
              <IoMdMail className="mr-2" />
              <a
                href={`mailto:${footer.email}`}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                {footer.email}
              </a>
            </span>

            <span className="hover:text-gray-200 transition-colors flex items-center">
              <FaPhoneAlt className="mr-2" />
              <a
                href={`tel:${footer.phone}`}
                className="text-gray-400 hover:text-gray-200  transition-colors"
              >
                {footer.phone}
              </a>
            </span>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-xl font-bold mb-4">Socials</h3>
            <ul className="flex flex-col items-center sm:items-start">
              <li className="mb-2 flex items-center text-gray-400">
                <FaFacebook className="mr-2" />
                <a
                  href={footer.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-200 transition-colors"
                >
                  Facebook
                </a>
              </li>

              <li className="mb-2 flex items-center text-gray-400">
                <FaInstagram className="mr-2" />
                <a
                  href={footer.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>

              <li className="mb-2 flex items-center text-gray-400">
                <FaYoutube className="mr-2" />
                <a
                  href={footer.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER (static for now) */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <div className="flex items-center border-b border-gray-400 pb-2 mb-4 w-full sm:w-auto">
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
              <input type="checkbox" className="mr-2" />
              I agree to the
              <a href="#" className="underline ml-1">
                Privacy Policy
              </a>
              .
            </label>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="text-gray-300 text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left mt-6">
          <p>
            SRZ Films © {new Date().getFullYear()}. All Rights Reserved.
          </p>
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

import { Image } from "antd";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useState } from "react";

function HeaderMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="text-black flex justify-between items-center p-4 bg-white shadow-sm fixed w-full top-0 z-50">
      {/* Logo */}
      <div className="ml-2">
        <Image preview={false}
          width={50}
          src="./logo-main-bg.png"
          alt="Logo"
          className="transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </div>
      {/* Menu Icon */}
      <div className="mr-2">
        {isMenuOpen ? (
          <IoMdClose
            className="text-3xl cursor-pointer transition-transform duration-300 hover:scale-110"
            onClick={toggleMenu}
          />
        ) : (
          <IoMdMenu
            className="text-3xl cursor-pointer transition-transform duration-300 hover:scale-110"
            onClick={toggleMenu}
          />
        )}
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 mt-2 p-6 bg-white shadow-lg text-black z-10 w-full transition-all duration-500 ease-in-out">
          <ul className="font-semibold grid grid-cols-1 gap-4">
            <li>
              <a href="#home" className="hover:text-blue-600 transition-colors duration-300" onClick={toggleMenu}>
                Home
              </a>
            </li>
            <li>
              <a href="#about-us" className="hover:text-blue-600 transition-colors duration-300" onClick={toggleMenu}>
                About Us
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-blue-600 transition-colors duration-300" onClick={toggleMenu}>
                Our Services
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-blue-600 transition-colors duration-300" onClick={toggleMenu}>
                Testimonials
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-blue-600 transition-colors duration-300" onClick={toggleMenu}>
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default HeaderMobile;

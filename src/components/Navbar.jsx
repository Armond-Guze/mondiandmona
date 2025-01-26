// src/components/Navbar.jsx
import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-red-500 text-white p-6 border-blue-600">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer text-[32px] hover:text-red-700">Mondi&Mona</div>

        {/* Links (Desktop) */}
        <ul className="hidden md:flex space-x-6 font-bold text-[20px]">
          <a href="#" className="hover:text-red-700">Home</a>
          <a href="#" className="hover:text-red-700">About</a>
          <a href="#" className="hover:text-red-700">Services</a>
          <a href="#" className="hover:text-red-700">Contact</a>
        </ul>

        {/* Toggle Button (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-red-500">
          <a href="#" className="block py-2 px-4 hover:bg-red-700">Home</a>
          <a href="#" className="block py-2 px-4 hover:bg-red-700">About</a>
          <a href="#" className="block py-2 px-4 hover:bg-red-700">Services</a>
          <a href="#" className="block py-2 px-4 hover:bg-red-700">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

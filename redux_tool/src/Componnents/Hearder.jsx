import React, { useState } from 'react';

import OpenMenu from '../assets/menu.png';
import CloseMenu from '../assets/arrow.png';
import AddToCart from './AddToCart';
import { Link } from "react-router";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {/* Main Navbar Flex Container */}
                <div className="flex justify-between items-center">

                    {/* Right Side - Logo */}
                    <div className="text-xl font-bold">Logo</div>

                    {/* Center - Navigation Links (hidden on mobile) */}
                    <div className="hidden sm:flex space-x-6">
                        <Link to='/' className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Home
                        </Link>
                        <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            About
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Services
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Contact
                        </a>
                    </div>

                    {/* Left Side - Mobile Menu & Cart */}
                    <div className="flex items-center space-x-4">
                        {/* Mobile Menu Button */}
                        <div className="sm:hidden">
                            <button
                                onClick={handleMenuToggle}
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                                aria-controls="mobile-menu"
                                aria-expanded={isMenuOpen}
                            >
                                <img
                                    src={isMenuOpen ? CloseMenu : OpenMenu}
                                    alt="Menu"
                                    className="h-10 w-10 text-white"
                                />
                            </button>
                        </div>

                        {/* Cart Icon */}


                        <AddToCart></AddToCart>
                        

                    </div>


                </div>

                {/* Mobile Dropdown Menu */}
                <div className={`sm:hidden mt-4 ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                    <hr className="border-gray-700" />
                    <div className="flex flex-col items-center space-y-2">
                       <Link to='/' className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Home
                        </Link>
                        <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-base font-medium">
                            About
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-base font-medium">
                            Services
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white px-3 py-2 text-base font-medium">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
            <hr className="border-gray-700" />
        </nav>
    );
};

export default Navbar;

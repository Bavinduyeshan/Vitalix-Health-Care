import React, { useState } from 'react';

export default function Main() {
  // State for managing mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State for managing account info sidebar visibility
  const [isAccountInfoOpen, setIsAccountInfoOpen] = useState(false);

  // Toggle the mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Toggle the account info visibility
  const toggleAccountInfo = () => {
    setIsAccountInfoOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
              onClick={toggleMobileMenu} // Toggle menu on click
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`block size-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className={`hidden size-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                  aria-current="page"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Team
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Projects
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Calendar
                </a>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 float-right">
            {/* Account image and toggle for account info */}
            <button
              onClick={toggleAccountInfo}
              className="relative flex items-center justify-center rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              <img
                className="h-8 w-8 rounded-full  "
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Account"
              />
              {/* Show account info when clicked */}
              {isAccountInfoOpen && (
                <div className="absolute right-0 mt-96 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                <div className="py-1 mt-2"> {/* Adjusted the margin-top value */}
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-700 hover:text-white"
                  >
                    View Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-700 hover:text-white"
                  > 
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-700 hover:text-white"
                  >
                    Sign out
                  </a>
                </div>
              
              
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggled based on `isMobileMenuOpen` state */}
      <div
        className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a
            href="#"
            className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
            aria-current="page"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Team
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Projects
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Calendar
          </a>
        </div>
      </div>
    </nav>
  );
}

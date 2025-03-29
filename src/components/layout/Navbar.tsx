
import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAuthed = location.pathname !== "/login" && location.pathname !== "/register";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "About", path: "/about" },
  ];

  const authLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Applications", path: "/applications" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-brand-700">TalentTrack</h1>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      cn(
                        "px-3 py-2 rounded-md text-sm font-medium",
                        isActive
                          ? "text-brand-600 bg-brand-50"
                          : "text-gray-700 hover:bg-gray-100"
                      )
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
                {isAuthed &&
                  authLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({ isActive }) =>
                        cn(
                          "px-3 py-2 rounded-md text-sm font-medium",
                          isActive
                            ? "text-brand-600 bg-brand-50"
                            : "text-gray-700 hover:bg-gray-100"
                        )
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {isAuthed ? (
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  className="ml-4 flex items-center text-gray-700"
                >
                  <div className="h-8 w-8 rounded-full bg-brand-500 text-white flex items-center justify-center mr-2">
                    U
                  </div>
                  <span>John Doe</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost">Sign in</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign up</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    isActive
                      ? "text-brand-600 bg-brand-50"
                      : "text-gray-700 hover:bg-gray-100"
                  )
                }
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            {isAuthed &&
              authLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "block px-3 py-2 rounded-md text-base font-medium",
                      isActive
                        ? "text-brand-600 bg-brand-50"
                        : "text-gray-700 hover:bg-gray-100"
                    )
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthed ? (
              <div className="flex items-center px-5">
                <div className="h-8 w-8 rounded-full bg-brand-500 text-white flex items-center justify-center">
                  U
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    John Doe
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    john@example.com
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-2 space-y-1">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-brand-600 bg-brand-50 hover:bg-brand-100"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

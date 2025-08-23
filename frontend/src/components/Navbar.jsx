import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleExpenseTrackerClick = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/");
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <button
            onClick={handleExpenseTrackerClick}
            className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300 ease-in-out"
          >
            ExpenseTracker
          </button>


          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {user ? (
              <>
                <Link
                  to="/home"
                  className="flex items-center gap-2 text-gray-700 font-medium transition-all duration-300 hover:text-blue-600 hover:scale-105"
                >
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                <Link
                  to="/account"
                  className="flex items-center gap-2 text-gray-700 font-medium transition-all duration-300 hover:text-blue-600 hover:scale-105"
                >
                  <User size={18} /> Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-red-500 shadow-md transition-all duration-300 hover:bg-red-600 hover:scale-105"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-gray-700 font-medium transition-all duration-300 hover:text-blue-600 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md transition-all duration-300 hover:from-purple-600 hover:to-blue-600 hover:scale-105"
                >
                  Register
                </Link>
              </>
            )}
          </div>


          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Animated) */}
      <AnimatePresence>
  {isMenuOpen && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg rounded-b-2xl"
    >
      <div className="px-5 py-5 space-y-4">
        {user ? (
          <>
            <Link
              to="/home"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-gray-700 font-medium transition-all duration-200 hover:text-primary hover:translate-x-1"
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>

            <Link
              to="/account"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 text-gray-700 font-medium transition-all duration-200 hover:text-primary hover:translate-x-1"
            >
              <User size={18} /> Account
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-700 font-medium w-full text-left transition-all duration-200 hover:text-red-500 hover:translate-x-1"
            >
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-700 font-medium transition-all duration-200 hover:text-primary hover:translate-x-1"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setIsMenuOpen(false)}
              className="block bg-primary text-white px-5 py-2 rounded-lg font-medium shadow-md hover:bg-primary-dark transition-all duration-200"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </nav>
  );
};

export default Navbar;

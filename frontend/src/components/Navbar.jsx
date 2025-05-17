import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Lottie from "react-lottie-player";
import { AuthContext } from "../context/AuthContext";
import globeAnimation from "../assets/animations/globe4.json";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!token && location.pathname === "/favorites") {
      navigate("/");
    }
  }, [location.pathname, navigate, token]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
    setMenuOpen(false); // Close menu on logout
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <motion.nav
      className='fixed top-0 left-0 z-50 w-full border-b shadow-lg backdrop-blur-md border-white/30 bg-[#0f0f0f0]/70'
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}>
      <div className='flex items-center justify-between px-6 py-3 mx-auto max-w-7xl'>
        <Link to='/' className='flex items-center gap-2'>
          <Lottie loop play animationData={globeAnimation} className='w-12 h-12 sm:w-16 sm:h-16 filter invert brightness-200' />
          <span className='text-2xl font-bold tracking-wide text-white drop-shadow-sm'>World Explorer</span>
        </Link>

        {/* Hamburger Icon */}
        <div className='text-2xl text-white md:hidden' onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Desktop Menu */}
        <div className='items-center hidden gap-6 text-xl font-medium text-white md:flex'>
          <Link to='/' className='transition-all hover:text-blue-600'>
            Home
          </Link>
          {token && (
            <Link to='/favorites' className='transition-all hover:text-blue-600'>
              Favorites
            </Link>
          )}
          {!token ? (
            <Link to='/login' className='transition-all hover:text-green-600'>
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} className='text-red-500 transition-all hover:text-red-600'>
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='md:hidden flex flex-col items-center bg-[#0f0f0f4b] px-6 py-4 text-white text-lg gap-4'>
          <Link to='/' onClick={toggleMenu} className='hover:text-blue-500'>
            Home
          </Link>
          {token && (
            <Link to='/favorites' onClick={toggleMenu} className='hover:text-blue-500'>
              Favorites
            </Link>
          )}
          {!token ? (
            <Link to='/login' onClick={toggleMenu} className='hover:text-green-500'>
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} className='text-red-500 hover:text-red-600'>
              Logout
            </button>
          )}
        </div>
      )}
    </motion.nav>
  );
}

export default Navbar;

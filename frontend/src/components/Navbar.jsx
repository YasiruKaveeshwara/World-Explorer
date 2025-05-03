import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Lottie from "react-lottie-player";
import globeAnimation from "../assets/animations/globe4.json"; 
import { toast } from "react-toastify";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("authToken") && location.pathname === "/favorites") {
      navigate("/");
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <motion.nav
      className='fixed top-0 left-0 z-50 w-full border-b shadow-lg backdrop-blur-md border-white/30'
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}>
      <div className='flex items-center justify-between px-6 py-1 mx-auto max-w-7xl'>
        <Link to='/' className='flex items-center gap-2'>
          <Lottie loop play animationData={globeAnimation} className='w-16 h-16 sm:w-16 sm:h-16 filter invert brightness-200' />

          <span className='text-2xl font-bold tracking-wide text-white drop-shadow-sm'>World Explorer</span>
        </Link>

        <div className='flex items-center gap-6 text-xl font-medium text-white'>
          <Link to='/' className='transition-all hover:text-blue-600'>
            Home
          </Link>

          {isLoggedIn && (
            <Link to='/favorites' className='transition-all hover:text-blue-600'>
              Favorites
            </Link>
          )}

          {!isLoggedIn ? (
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
    </motion.nav>
  );
}

export default Navbar;

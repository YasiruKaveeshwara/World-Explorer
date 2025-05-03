import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NotFound() {
  return (
    <div className='relative flex items-center justify-center min-h-screen overflow-hidden text-center'>
      {/* Background Image */}
      <img src='/images/regions/world.jpg' alt='404-bg' className='absolute inset-0 object-cover w-full h-full' />
      <div className='absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm' />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='relative z-10 max-w-md p-10 shadow-xl bg-white/10 backdrop-blur-lg rounded-2xl'>
        <h1 className='mb-4 text-6xl font-bold text-white drop-shadow'>404</h1>
        <p className='mb-6 text-lg text-white drop-shadow'>Oops! The page you’re looking for doesn’t exist.</p>
        <Link to='/' className='inline-block px-6 py-2 mt-2 text-white transition bg-blue-600 rounded-full hover:bg-blue-700'>
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;

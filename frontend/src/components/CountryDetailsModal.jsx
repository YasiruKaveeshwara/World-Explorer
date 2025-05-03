import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { FaHeart, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function CountryDetailsModal({ country, onClose }) {
  if (!country) return null;

  const token = localStorage.getItem("authToken");

  const handleAddFavorite = async () => {
    if (!token) {
      toast.warn(
        <span>
          Please login to save favorites.
          <br />
          <Link to='/login' className='text-blue-500 underline hover:text-blue-700'>
            Login
          </Link>
        </span>,
        { autoClose: 5000 }
      );
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/countries/favorites",
        {
          countryCode: country.cca3,
          countryName: country.name.common,
          flag: country.flags.svg,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Country added to your favorites!");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      toast.error("Failed to add favorite.");
    }
  };

  return (
    <motion.div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className='relative w-full max-w-lg p-6 mx-4 bg-white shadow-2xl bg-opacity-80 rounded-2xl'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute p-2 text-2xl text-white transition bg-red-500 rounded-full shadow-lg hover:bg-red-600 top-4 right-4'
          title='Close'>
          <FaTimes />
        </button>

        {/* Country Flag */}
        <img src={country.flags.svg} alt={country.name.common} className='object-cover w-full h-48 mb-4 rounded-xl' />

        {/* Country Info */}
        <h2 className='mb-4 text-2xl font-bold text-blue-600'>{country.name.common}</h2>

        <div className='mb-6 space-y-2 text-sm text-gray-600'>
          <p>
            <span className='font-semibold'>Official Name:</span> {country.name.official}
          </p>
          <p>
            <span className='font-semibold'>Capital:</span> {country.capital ? country.capital[0] : "N/A"}
          </p>
          <p>
            <span className='font-semibold'>Region:</span> {country.region}
          </p>
          <p>
            <span className='font-semibold'>Subregion:</span> {country.subregion}
          </p>
          <p>
            <span className='font-semibold'>Population:</span> {country.population.toLocaleString()}
          </p>
          <p>
            <span className='font-semibold'>Languages:</span> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
          </p>
        </div>

        {/* Favorite Button  */}
        <div className='absolute bottom-4 right-4'>
          <button
            onClick={handleAddFavorite}
            className='flex items-center justify-center w-12 h-12 text-pink-500 transition-colors bg-white rounded-full shadow-lg hover:bg-pink-100'
            title={token ? "Add to Favorites" : "Login to Save"}>
            <FaHeart className='text-xl' />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default CountryDetailsModal;

import React from "react";
import { motion } from 'framer-motion';

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
        "https://world-explorer-y556.onrender.com/api/countries/favorites",
        {
          countryCode: country.cca3,
          countryName: country.name.common,
          flag: country.flags.svg,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Country added to your favorites!");
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      toast.error("Failed to add favorite.");
    }
  };

  const formatObject = (obj) =>
    obj
      ? Object.values(obj)
          .map((item) => item.name || item)
          .join(", ")
      : "N/A";

  return (
    <motion.div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <div className='relative w-full max-w-lg p-6 mx-4 bg-white shadow-2xl bg-opacity-80 rounded-2xl overflow-y-auto max-h-[90vh]'>
        <button
          onClick={onClose}
          className='absolute p-2 text-2xl text-white transition bg-red-500 rounded-full shadow-lg hover:bg-red-600 top-4 right-4'
          title='Close'>
          <FaTimes />
        </button>

        <img src={country.flags.svg} alt={country.name.common} className='object-cover w-full mb-4 rounded-xl' />

        <h2 className='mb-4 text-2xl font-bold text-blue-600'>{country.name.official}</h2>

        <div className='grid grid-cols-1 mx-4 text-sm text-gray-700 sm:grid-cols-2 gap-y-3'>
          <div>
            <strong>Capital:</strong>
          </div>
          <div>{country.capital?.[0] || "N/A"}</div>
          <div>
            <strong>Region:</strong>
          </div>
          <div>{country.region}</div>
          <div>
            <strong>Subregion:</strong>
          </div>
          <div>{country.subregion}</div>
          <div>
            <strong>Population:</strong>
          </div>
          <div>{country.population.toLocaleString()}</div>
          <div>
            <strong>Area:</strong>
          </div>
          <div>{country.area?.toLocaleString()} km²</div>
          <div>
            <strong>Timezones:</strong>
          </div>
          <div>{country.timezones?.join(", ")}</div>
          <div>
            <strong>Languages:</strong>
          </div>
          <div>{country.languages ? Object.values(country.languages).join(", ") : "N/A"}</div>
          <div>
            <strong>Currencies:</strong>
          </div>
          <div>{formatObject(country.currencies)}</div>
          <div>
            <strong>Top Level Domain:</strong>
          </div>
          <div>{country.tld?.join(", ") || "N/A"}</div>
          <div>
            <strong>Dial Code:</strong>
          </div>
          <div>
            {country.idd?.root}
            {country.idd?.suffixes?.[0] || ""}
          </div>
          <div>
            <strong>Borders:</strong>
          </div>
          <div>{country.borders?.join(", ") || "None"}</div>
          <div>
            <strong>Driving Side:</strong>
          </div>
          <div>{country.car?.side || "N/A"}</div>
          <div>
            <strong>Start of Week:</strong>
          </div>
          <div>{country.startOfWeek || "N/A"}</div>
          <div>
            <strong>UN Member:</strong>
          </div>
          <div>{country.unMember ? "Yes" : "No"}</div>
        </div>

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

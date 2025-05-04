import React from "react";
import { motion } from 'framer-motion';



function CountryCard({ country }) {
  return (
    <motion.div
      className='overflow-hidden bg-white rounded-2xl shadow-xl cursor-pointer transform transition-all bg-opacity-70 duration-300 hover:scale-[1.03]'
      whileHover={{ scale: 1.03 }}>
      <div className='overflow-hidden rounded-t-2xl'>
        <motion.img
          loading='lazy'
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          decoding="async"
          className='object-cover w-full h-40 transition-transform duration-500 hover:scale-110'
        />
      </div>
      <div className='p-5 text-gray-600'>
        <h2 className='mb-3 text-xl font-semibold text-gray-600'>{country.name.common}</h2>
        <p className='mb-1 text-sm'>
          <span className='font-medium text-gray-500'>Population:</span> {country.population.toLocaleString()}
        </p>
        <p className='mb-1 text-sm'>
          <span className='font-medium text-gray-500'>Region:</span> {country.region}
        </p>
        <p className='text-sm'>
          <span className='font-medium text-gray-500'>Capital:</span> {country.capital ? country.capital[0] : "N/A"}
        </p>
      </div>
    </motion.div>
  );
}

export default CountryCard;

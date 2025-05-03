import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className='flex items-center w-full max-w-xl px-5 py-3 mx-auto mb-8 transition-all duration-300 ease-in-out border rounded-full shadow-md bg-white/20 border-white/30 backdrop-blur-md focus-within:ring-2 focus-within:ring-blue-400'>
      <FaSearch className='mr-3 text-lg text-white opacity-80' />
      <input
        type='text'
        placeholder='Search for a country...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='flex-grow font-medium text-white bg-transparent outline-none placeholder-white/70'
      />
    </div>
  );
}

export default SearchBar;

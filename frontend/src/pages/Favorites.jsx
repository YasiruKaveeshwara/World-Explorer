import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import CountryDetailsModal from "../components/CountryDetailsModal";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) return;

      try {
        const response = await axios.get("https://world-explorer-y556.onrender.com/api/countries/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const detailedFavorites = await Promise.all(
          response.data.map(async (fav) => {
            try {
              const res = await axios.get(`https://restcountries.com/v3.1/alpha/${fav.countryCode}`);
              return { ...res.data[0], _id: fav._id };
            } catch {
              return null;
            }
          })
        );

        setFavorites(detailedFavorites.filter(Boolean));
      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [token]);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`https://world-explorer-y556.onrender.com/api/countries/favorites/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites((prev) => prev.filter((fav) => fav._id !== id));
      toast.success("Removed from favorites!");
    } catch (error) {
      toast.error("Failed to remove.");
    }
  };

  const filtered = favorites.filter(
    (country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) && (!selectedRegion || country.region === selectedRegion)
  );

  if (!token) {
    return (
      <div className='px-6 pt-24 mx-auto text-center max-w-7xl'>
        <h1 className='mb-6 text-3xl font-bold text-blue-700'>Please login to view your favorites</h1>
      </div>
    );
  }

  return (
    <div className='relative min-h-screen px-6 pt-24 pb-16'>
      {/* Background */}
      <motion.div className='fixed inset-0 -z-10' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <img src='/images/regions/world.jpg' className='object-cover w-full h-full' alt='bg' />
        <div className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md' />
      </motion.div>

      <h1 className='mb-6 text-4xl font-bold text-center text-white'>Your Favorite Countries</h1>

      {/* Search + Filter */}
      <div className='relative flex-col items-center justify-center gap-4 mb-10 sm:flex-row sm:justify-center'>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterDropdown selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
      </div>

      {isLoading ? (
        <Loader text='Fetching your favorite countries...' />
      ) : filtered.length === 0 ? (
        <p className='text-center text-gray-200'>No favorite countries found for this search or region.</p>
      ) : (
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {filtered.map((country) => (
            <motion.div
              key={country._id}
              className='relative overflow-hidden transition-all duration-300 transform bg-white shadow-lg cursor-pointer rounded-2xl hover:scale-105'
              onClick={() => setSelectedCountry(country)}>
              <img src={country.flags.svg} alt={country.name.common} className='object-cover w-full h-40' />
              <div className='p-5'>
                <h2 className='mb-2 text-xl font-bold text-blue-600'>{country.name.common}</h2>
                <p className='text-sm text-gray-500'>{country.cca3}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(country._id);
                }}
                className='absolute px-3 py-1 text-xs text-white bg-red-500 rounded-full top-3 right-3 hover:bg-red-600'>
                Remove
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {selectedCountry && <CountryDetailsModal country={selectedCountry} onClose={() => setSelectedCountry(null)} />}
    </div>
  );
}

export default Favorites;

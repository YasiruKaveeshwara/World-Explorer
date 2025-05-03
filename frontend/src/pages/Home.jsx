import React, { useState, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import CountryCard from "../components/CountryCard";
import CountryDetailsModal from "../components/CountryDetailsModal";
import Loader from "../components/Loader";
import axios from "axios";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Lottie from "react-lottie-player";
import globeAnimation from "../assets/animations/globe4.json";

const regionBackgrounds = {
  Default: "/images/regions/world.jpg",
  Asia: "/images/regions/asia1.jpg",
  Europe: "/images/regions/europe1.jpg",
  Africa: "/images/regions/africa1.jpg",
  Americas: "/images/regions/usa3.jpg",
  Oceania: "/images/regions/australia.jpg",
};

function Home() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bgImage, setBgImage] = useState(regionBackgrounds.Default);
  const [sortOrder, setSortOrder] = useState("asc");

  const heroRef = useRef(null);
  const quoteRef = useRef(null);
  const filterRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isQuoteInView = useInView(quoteRef, { once: true });
  const isFilterInView = useInView(filterRef, { once: true });

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 300], [0, -80]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();

    let hasSnapped = false;
    const handleWheel = (e) => {
      const scrollY = window.scrollY;

      if (!hasSnapped && scrollY < 100 && e.deltaY > 0) {
        e.preventDefault();
        const filterTop = filterRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: filterTop - 180, behavior: "smooth" });
        hasSnapped = true;
        setTimeout(() => (hasSnapped = false), 100);
      }

      if (!hasSnapped && scrollY > 100 && e.deltaY < 0) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        hasSnapped = true;
        setTimeout(() => (hasSnapped = false), 100);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    setBgImage(regionBackgrounds[selectedRegion] || regionBackgrounds.Default);
  }, [selectedRegion]);

  const filteredCountries = countries.filter(
    (country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) && (selectedRegion ? country.region === selectedRegion : true)
  );

  const sortedCountries = [...filteredCountries].sort((a, b) => {
    const nameA = a.name.common.toLowerCase();
    const nameB = b.name.common.toLowerCase();
    return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  return (
    <div className='relative mx-auto overflow-visible font-body'>
      {/* Animated background region */}
      <motion.div
        key={bgImage}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className='fixed inset-0 z-0'>
        <img src={bgImage} alt='region-bg' className='object-cover w-full h-full' />
        <div className='absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm' />
      </motion.div>

      <motion.div
        ref={heroRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className='relative z-10 w-full h-[60vh] md:h-[70vh] overflow-hidden shadow-2xl'>
        <motion.img src='/images/world3.jpg' alt='hero' className='absolute inset-0 object-cover w-full h-full' style={{ y: parallaxY }} />

        {/* Overlay */}
        <div className='absolute inset-0 bg-black bg-opacity-50' />

        {/* Foreground content */}
        <div className='absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white'>
          <Lottie loop animationData={globeAnimation} play className='w-40 h-40 filter invert brightness-200' />

          <h1 className='mb-4 text-4xl tracking-wide text-white md:text-5xl font-heading drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]'>Discover Our World</h1>

          <p className='max-w-2xl text-lg md:text-xl text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]'>
            Explore hidden gems and experience cinematic exploration — one country at a time.
          </p>
        </div>
      </motion.div>

      {/* Search & Filter */}
      <div className='relative px-6 py-12 overflow-visible over'>
        <motion.p
          ref={quoteRef}
          className='mb-10 text-xl italic text-center text-white font-heading'
          initial={{ opacity: 0, y: 20 }}
          animate={isQuoteInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          "The world is a book and those who do not travel read only one page." – Saint Augustine
        </motion.p>

        <motion.div
          ref={filterRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isFilterInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterDropdown selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </motion.div>
      </div>

      {/* Country Cards */}
      <div className='relative z-10 px-6 md:px-24'>
        {isLoading ? (
          <Loader />
        ) : filteredCountries.length > 0 ? (
          <motion.div
            className='grid grid-cols-1 gap-10 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            initial='hidden'
            animate='show'
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}>
            {sortedCountries.map((country) => (
              <motion.div
                key={country.cca3}
                onClick={() => setSelectedCountry(country)}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}>
                <CountryCard country={country} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className='mt-20 text-center text-gray-200'>No countries found for your search or filter.</p>
        )}
      </div>

      {/* Country Modal */}
      {selectedCountry && <CountryDetailsModal country={selectedCountry} onClose={() => setSelectedCountry(null)} />}
    </div>
  );
}

export default Home;

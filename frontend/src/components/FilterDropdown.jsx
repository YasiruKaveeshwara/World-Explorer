import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaChevronDown, FaGlobeAmericas, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
const sortOptions = [
  { label: "A → Z", value: "asc", icon: <FaSortAlphaDown /> },
  { label: "Z → A", value: "desc", icon: <FaSortAlphaUp /> },
];

export default function FilterDropdown({ selectedRegion, setSelectedRegion, sortOrder, setSortOrder }) {
  return (
    <div className='z-50 flex flex-col gap-4 mt-6 sm:flex-row sm:items-center sm:justify-center'>
      {/* Region Filter */}
      <Listbox value={selectedRegion} onChange={setSelectedRegion}>
        <div className='relative w-full sm:w-64'>
          <Listbox.Button className='flex items-center justify-between w-full px-5 py-2 text-white border rounded-full shadow-md bg-white/20 backdrop-blur-md border-white/30'>
            <span className='flex items-center gap-3'>
              <FaGlobeAmericas className='text-xl' />
              {selectedRegion || "Filter by Region"}
            </span>
            <FaChevronDown className='ml-2 text-sm' />
          </Listbox.Button>
          <Transition as={Fragment} leave='transition duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <Listbox.Options className='absolute z-50 w-full mt-2 overflow-hidden text-sm shadow-lg bg-white/80 rounded-xl backdrop-blur-md ring-1 ring-white/20'>
              <Listbox.Option key='all' value='' className='px-4 py-2 text-center text-gray-700 cursor-pointer hover:bg-blue-100'>
                All Regions
              </Listbox.Option>
              {regions.map((region) => (
                <Listbox.Option key={region} value={region} className='px-4 py-2 text-center text-gray-700 cursor-pointer hover:bg-blue-100'>
                  {region}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {/* Sort Filter */}
      <Listbox value={sortOrder} onChange={setSortOrder}>
        <div className='relative w-full sm:w-64'>
          <Listbox.Button className='flex items-center justify-between w-full px-5 py-2 text-white border rounded-full shadow-md bg-white/20 backdrop-blur-md border-white/30'>
            <span className='flex items-center gap-3'>
              {sortOptions.find((o) => o.value === sortOrder)?.icon}
              {sortOptions.find((o) => o.value === sortOrder)?.label || "Sort"}
            </span>
            <FaChevronDown className='ml-2 text-sm' />
          </Listbox.Button>
          <Transition as={Fragment} leave='transition duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <Listbox.Options className='absolute z-50 w-full mt-2 overflow-hidden text-sm shadow-lg bg-white/80 rounded-xl backdrop-blur-md ring-1 ring-white/20'>
              {sortOptions.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  className='px-4 py-2 text-center text-gray-700 cursor-pointer hover:bg-blue-100'>
                  {option.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';

const SearchBar = () => {
  const [isActive, setIsActive] = useState(false);
  const searchBarRef = useRef(null);

  const toggleSearchBar = () => {
    setIsActive(!isActive);
  };

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={searchBarRef}>
      <button
        className="text-xl focus:outline-none"
        onClick={toggleSearchBar}
      >
        🔍
      </button>
      {isActive && (
        <div className="absolute top-0 right-0 transform translate-y-12 bg-white border border-gray-300 rounded-lg shadow-lg p-2 w-72">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 text-sm border-none rounded-full focus:outline-none bg-gray-100"
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;

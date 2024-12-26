import React from 'react';

const Spinner = ({ loaderMsg }) => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <svg
            className="w-10 h-10 text-white animate-pulse"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1 0h.01M12 18a9 9 0 110-18 9 9 0 010 18z"
            />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-10 text-lg font-semibold animate-bounce">
        {loaderMsg}
      </div>
    </div>
  );
};

export default Spinner;

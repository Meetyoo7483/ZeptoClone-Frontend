import React from 'react';
const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <svg
        className="w-12 h-12 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 50 50"
        role="status"
        aria-label="Loading"
      >
        {/* Background ring (faint) */}
        <circle
          className="opacity-20"
          cx="25"
          cy="25"
          r="22"
          stroke="currentColor"
          strokeWidth="4"
        />
        {/* Foreground arc */}
        <path
          className="opacity-80"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="4"
          d="M25 3
             a22 22 0 0 1 0 44
             a22 22 0 0 1 0 -44"
          /* The above draws a circle path: you only see half / arc due to stroke‐dasharray below */
          strokeDasharray="34 138"
          strokeDashoffset="0"
        />
      </svg>
    </div>
  );
};

export default Spinner;

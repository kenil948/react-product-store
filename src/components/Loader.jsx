import React from "react";

function Loader() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-black animate-spin rounded-full"></div>

      <p className="mt-3 text-gray-600 text-sm">Loading...</p>
    </div>
  );
}

export default Loader;

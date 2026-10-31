import React from "react";

function Loader() {
  return (
    <div className="w-full min-h-[50vh] md:h-screen flex flex-col items-center justify-center p-4">
      <div className="w-9 h-9 border-[3px] border-zinc-200 border-t-zinc-900 animate-spin rounded-full"></div>

      <p className="mt-3 text-zinc-500 text-sm font-medium">Loading...</p>
    </div>
  );
}

export default Loader;

import React from "react";
import Home from "./components/Home";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Details from "./components/Details";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
  const { search, pathname } = useLocation();

  return (
    <div className="w-full min-h-screen md:h-screen flex flex-col md:flex-row relative bg-zinc-50/50 text-zinc-800 antialiased selection:bg-zinc-900 selection:text-white">
      {(pathname != "/" || search.length > 0) && (
        <Link
          to="/"
          className={`border px-4 py-1.5 rounded-full text-sm font-medium text-zinc-700 bg-white border-zinc-200/80 shadow-xs hover:bg-zinc-100 hover:text-zinc-900 transition-colors z-20 ${
            pathname === "/"
              ? "absolute top-3.5 right-3.5 sm:right-5 md:top-5 md:left-[22%] md:right-auto"
              : "absolute top-4 left-4 md:top-5 md:left-[22%]"
          }`}
        >
          Home
        </Link>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;

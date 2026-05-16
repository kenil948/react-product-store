import React from "react";
import Home from "./components/Home";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Details from "./components/Details";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
  const { search, pathname } = useLocation();

  return (
    <div className="w-full h-screen flex">
      {(pathname != "/" || search.length > 0) && (
        <Link
          to="/"
          className="absolute top-5 left-[22%] border px-4 py-1 rounded-md text-sm text-blue-400 border-blue-200 hover:bg-blue-50 transition"
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

import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";
import Loader from "./Loader";
import { ProductContext } from "../utils/Context";

function Home() {
  const [products] = useContext(ProductContext);

  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const filteredProducts =
    category === "undefined"
      ? products
      : products.filter((item) => item.category === category);

  return products ? (
    <>
      <Navbar />
      <div className="w-full md:w-[80%] md:h-full px-5 pt-5 pb-8 sm:p-5 md:pt-18 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:flex xl:flex-wrap gap-4 overflow-y-auto content-start flex-1 bg-zinc-50/30">
        {filteredProducts &&
          filteredProducts.map((item) => {
            return (
              <Link
                key={item.id}
                to={`/details/${item.id}`}
                className="w-full xl:w-[17%] h-[210px] sm:h-[230px] md:h-[35vh] border rounded-2xl p-2.5 md:p-3 flex flex-col items-center justify-between border-zinc-200/80 bg-white shadow-xs hover:shadow-md hover:border-zinc-300 cursor-pointer transition shrink-0 group"
              >
                <div className="w-full h-[72%] sm:h-[75%] md:h-[78%] flex items-center justify-center p-2 overflow-hidden bg-zinc-50/80 rounded-xl">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 motion-reduce:group-hover:scale-100"
                    loading="lazy"
                  />
                </div>
                <div className="w-full h-[28%] sm:h-[25%] md:h-[22%] flex items-center justify-center">
                  <h1 className="text-xs sm:text-sm font-medium leading-tight text-center line-clamp-2 text-zinc-800 group-hover:text-zinc-950 transition-colors px-1">
                    {item.title}
                  </h1>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  ) : (
    <Loader />
  );
}

export default Home;

import React, { useContext, useState, useRef, useEffect } from "react";
import { ProductContext } from "../utils/Context";
import { Link, useLocation } from "react-router-dom";

const PALETTE = [
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#10B981",
  "#06B6D4",
  "#3B82F6",
  "#6366F1",
  "#A855F7",
  "#EC4899",
];

function Navbar() {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const activeCategory = search.includes("category=")
    ? decodeURIComponent(search.split("=")[1])
    : "";

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  const handleScroll = () => {
    setIsScrolling(true);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 800);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  let distinctCategory =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);

  distinctCategory = [...new Set(distinctCategory)];

  return (
    <nav className="w-full md:w-[20%] md:h-full bg-zinc-50 max-md:sticky max-md:top-0 z-10 px-5 py-4 sm:p-5 flex flex-col items-center shrink-0 border-b md:border-b-0 md:border-r border-zinc-200">
      <div className="w-full flex items-center justify-between md:justify-center">
        <Link
          className="border px-4 py-2 md:px-5 md:py-2 rounded-full border-zinc-900 bg-zinc-900 text-white text-sm font-medium shadow-xs hover:bg-zinc-800 transition active:scale-95 motion-reduce:active:scale-100"
          to="/create"
        >
          Add New Product
        </Link>
      </div>

      <hr className="hidden md:block w-full my-3 border-zinc-200" />

      <div className="w-full mt-3 md:mt-0">
        <h1 className="w-full text-xs md:text-xl font-semibold uppercase md:normal-case tracking-wider md:tracking-normal text-zinc-500 md:text-zinc-900 mb-2 md:mb-0">
          Category Filter
        </h1>
        <div
          onScroll={handleScroll}
          className={`-mx-5 px-5 md:mx-0 md:px-0 md:w-full mt-1 md:mt-2 flex flex-row md:flex-col gap-2 text-sm overflow-x-auto md:overflow-x-hidden md:overflow-y-auto pb-1 md:pb-0 [mask-image:linear-gradient(to_right,black_88%,transparent)] md:[mask-image:none] ${
            !isScrolling ? "category-scroll-hidden" : ""
          }`}
        >
          {distinctCategory.map((item, index) => {
            const isActive = activeCategory === item;
            return (
              <Link
                key={item || index}
                to={`/?category=${item}`}
                aria-current={isActive ? "true" : undefined}
                className={`flex items-center gap-2 shrink-0 md:shrink px-3 py-1.5 md:p-0 rounded-full md:rounded-none border md:border-0 md:bg-transparent transition ${
                  isActive
                    ? "bg-zinc-900 border-zinc-900 text-white md:bg-transparent md:border-0 md:text-zinc-900"
                    : "bg-white border-zinc-200 hover:text-zinc-900"
                }`}
              >
                <span
                  style={{ backgroundColor: PALETTE[index % PALETTE.length] }}
                  className={`w-3.5 h-3.5 md:w-3.75 md:h-3.75 rounded-full shrink-0 shadow-xs ${
                    isActive ? "max-md:ring-2 max-md:ring-white" : ""
                  }`}
                ></span>
                <span
                  className={`capitalize whitespace-nowrap text-xs md:text-sm transition-colors ${
                    isActive
                      ? "text-white font-medium md:font-semibold md:text-zinc-900 md:underline md:decoration-2 md:decoration-zinc-900/30 md:underline-offset-4"
                      : "font-medium md:font-normal text-zinc-700 md:text-zinc-600 md:hover:text-zinc-900"
                  }`}
                >
                  {item}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

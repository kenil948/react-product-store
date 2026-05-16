import React, { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";

function Navbar() {
  const [products] = useContext(ProductContext);

  let distinctCategory =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);

  distinctCategory = [...new Set(distinctCategory)];

  const color = () => {
    return `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}, 0.4)`;
  };

  return (
    <nav className="w-[20%] h-full bg-zinc-50 p-5 flex flex-col items-center">
      <Link
        className="border px-5 py-2 rounded-md border-blue-200 text-blue-300 text-sm"
        to="/create"
      >
        Add New Product
      </Link>
      <hr className="w-full my-3 text-blue-200" />
      <h1 className="w-full text-xl">Category Filter</h1>
      <div className="w-full mt-2 flex flex-col gap-2 text-sm">
        {distinctCategory.map((item, index) => {
          return (
            <Link
              key={item.id}
              to={`/?category=${item}`}
              className="flex items-center gap-2"
            >
              <span
                style={{ backgroundColor: color() }}
                className="w-3.75 h-3.75 rounded-full"
              ></span>
              {item}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;

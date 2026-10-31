import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import { ProductContext } from "../utils/Context";

function Details() {

  const navigate = useNavigate()

  const [products, setProducts] = useContext(ProductContext);
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!product) {
      setProduct(products.filter((item) => item.id == id)[0]);
    }
  }, []);

  const deleteProductHandler =(id)=>{
    const filteredProducts = products.filter((item)=>item.id !== id)
    setProducts(filteredProducts)
    navigate("/")
  }

  return product ? (
    <div className="w-full max-w-5xl mx-auto px-5 py-14 sm:px-10 md:py-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 min-h-screen md:min-h-0 overflow-y-auto">
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          className="max-w-[240px] sm:max-w-[300px] md:w-[320px] max-h-[260px] sm:max-h-[320px] object-contain hover:scale-105 transition-transform duration-300 drop-shadow-md rounded-2xl bg-zinc-50/80 p-4 border border-zinc-200/60 motion-reduce:hover:scale-100"
          src={product.thumbnail}
          alt={product.title}
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col gap-3 sm:gap-4 md:gap-5">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold break-words leading-tight text-zinc-900 tracking-tight">{product.title}</h1>

        <h2 className="uppercase text-xs sm:text-sm tracking-widest text-zinc-400 font-semibold">
          {product.category}
        </h2>

        <h3 className="text-xl sm:text-2xl font-bold text-zinc-900">${product.price}</h3>

        <p className="text-zinc-600 leading-relaxed max-w-md text-sm sm:text-base">
          {product.description}
        </p>
        <div className="flex items-center gap-3 sm:gap-5 mt-2 md:mt-4 w-full sm:w-auto">
          <Link to={`/edit/${product.id}`} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-zinc-900 text-white text-sm font-medium shadow-xs hover:bg-zinc-800 hover:-translate-y-0.5 active:translate-y-0 transition motion-reduce:hover:translate-y-0">
            Edit
          </Link>

          <button onClick={()=>{deleteProductHandler(product.id)}} className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-red-200 bg-white text-red-600 text-sm font-medium shadow-xs hover:bg-red-50 hover:border-red-300 hover:-translate-y-0.5 active:translate-y-0 transition cursor-pointer motion-reduce:hover:translate-y-0">
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default Details;
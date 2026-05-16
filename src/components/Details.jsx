import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import Loader from "./Loader";
import { ProductContext } from "../utils/Context";

function Details() {

  const navigate = useNavigate()

  const [products, setProducts] = useContext(ProductContext);
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  // const getSingleProduct = async () => {
  //   try {
  //     const { data } = await axios(`/products/${id}`);
  //     setProduct(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (!product) {
      setProduct(products.filter((item) => item.id == id)[0]);
    }
    // getSingleProduct();
  }, []);

  const deleteProductHandler =(id)=>{
    const filteredProducts = products.filter((item)=>item.id !== id)
    setProducts(filteredProducts)
    // localStorage.setItem("products", JSON.stringify(filteredProducts))
    navigate("/")
  }

  return product ? (
    <div className="max-w-5xl mx-auto px-10 py-20 flex items-center gap-16">
      <div className="w-1/2 flex justify-center">
        <img
          className="w-[320px] hover:scale-105 transition duration-300"
          src={product.thumbnail}
          alt="product"
        />
      </div>

      <div className="w-1/2 flex flex-col gap-5">
        <h1 className="text-4xl font-semibold">{product.title}</h1>

        <h2 className="uppercase text-sm tracking-widest text-gray-500">
          {product.category}
        </h2>

        <h3 className="text-2xl font-bold text-gray-900">${product.price}</h3>

        <p className="text-gray-600 leading-relaxed max-w-md">
          {product.description}
        </p>
        <div className="flex gap-5 mt-4">
          <Link to={`/edit/${product.id}`} className="flex items-center gap-2 px-7 py-3 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 hover:-translate-y-1 transition duration-200 shadow-md">
            Edit
          </Link>

          <button onClick={()=>{deleteProductHandler(product.id)}} className="flex items-center gap-2 px-6 py-3 rounded-lg border border-red-300 text-red-500 text-sm font-medium hover:bg-red-100 hover:-translate-y-1 transition duration-200">
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
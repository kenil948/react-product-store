import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";
import Loader from "./Loader";
import { ProductContext } from "../utils/Context";
import axios from "../utils/axios";

function Home() {
  const [products] = useContext(ProductContext);

  const {search} = useLocation()
  const category = decodeURIComponent(search.split("=")[1])

  const[filteredProducts, setFilteredProducts] = useState(null)

   const getProductCategory = async ()=>{
    try {
      const {data} = await axios(`/products/category/${category}`)
      setFilteredProducts(data.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(!filteredProducts || category === "undefined"){
      setFilteredProducts(products) 
    }
    if(category != "undefined"){  
      // getProductCategory()
      setFilteredProducts(products.filter((item)=>item.category === category))
    }
  }, [category, products])


  return products ? (
    <>
      <Navbar />
      <div className="w-[80%] h-full p-5 pt-18 flex flex-wrap gap-4 overflow-x-hidden overflow-y-auto content-start">
        {filteredProducts && filteredProducts.map((item, index) => {
          return (
            <Link key={item.id}
              to={`/details/${item.id}`}
              className="card w-[17%] h-[35vh] border rounded p-3 flex flex-col items-center gap-2 hover:shadow-lg cursor-pointer mb-3"
            >
              <div
                className="w-full h-[80%] rounded bg-cover bg-center hover:scale-105 transition duration-300"
                style={{
                  backgroundImage:
                    `url("${encodeURI(item.thumbnail)}")`,
                }}
              ></div>
              <h1 className="text-sm leading-4">
                {item.title}
              </h1>
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

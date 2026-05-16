import axios from "./axios";
import React, { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

function Context(props) {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("products")) || [],
  );

  const getProducts = async () => {
    try {
      const { data } = await axios("/products");

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      getProducts();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <ProductContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductContext.Provider>
  );
}

export default Context;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";

function Edit() {
  const [products, setProducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    thumbnail: "",
    title: "",
    category: "",
    price: "",
    description: "",
  });

  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setProduct(products.filter((item) => item.id == id)[0]);
  }, [id, products]);

  const addProductHandler = (e) => {
    e.preventDefault();

    if (
      product.title.trim().length < 2 ||
      product.thumbnail.trim().length < 5 ||
      product.category.trim().length < 2 ||
      product.price.trim().length < 1 ||
      product.description.trim().length < 10
    ) {
      toast.error("Please enter valid data");
      return;
    }

    const pi = products.findIndex((item) => item.id == id);

    const updatedProducts = [...products];

    updatedProducts[pi] = { ...products[pi], ...product };
    
    setProducts(updatedProducts);
    // localStorage.setItem("products", JSON.stringify(updatedProducts));
    navigate(-1);
  };

  return (
    <form
      onSubmit={addProductHandler}
      className="flex flex-col items-center w-full h-screen p-[5%]"
    >
      <h1 className="text-2xl mb-3">Edit Product</h1>
      <input
        className="w-1/2 text-xl p-3 bg-zinc-100 rounded mb-3 outline-zinc-200"
        type="url"
        placeholder="Image link"
        name="thumbnail"
        onChange={changeHandler}
        value={product && product.thumbnail}
      />
      <input
        className="w-1/2 text-xl p-3 bg-zinc-100 rounded mb-3 outline-zinc-200"
        type="text"
        placeholder="Title"
        name="title"
        onChange={changeHandler}
        value={product && product.title}
      />
      <div className="flex gap-3 w-1/2">
        <input
          className="w-1/2 text-xl p-3 bg-zinc-100 rounded mb-3 outline-zinc-200"
          type="text"
          placeholder="Category"
          name="category"
          onChange={changeHandler}
          value={product && product.category}
        />
        <input
          className="w-1/2 text-xl p-3 bg-zinc-100 rounded mb-3 outline-zinc-200"
          type="number"
          placeholder="Price"
          name="price"
          onChange={changeHandler}
          value={product && product.price}
        />
      </div>
      <textarea
        className="w-1/2 text-xl p-3 bg-zinc-100 rounded mb-3 outline-zinc-200"
        placeholder="Enter product descriptio here..."
        rows="7"
        name="description"
        onChange={changeHandler}
        value={product && product.description}
      ></textarea>
      <button className="border px-5 py-2 rounded-md border-blue-200 text-blue-300 text-xl cursor-pointer">
        Edit Product
      </button>
    </form>
  );
}

export default Edit;

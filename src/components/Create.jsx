import React, { useContext, useState } from "react";
import { nanoid } from "nanoid";
import { ProductContext } from "../utils/Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Create() {

  const navigate = useNavigate()

  const [products, setProducts] = useContext(ProductContext);

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const addProductHandler = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 2 ||
      image.trim().length < 5 ||
      category.trim().length < 2 ||
      price.trim().length < 1 ||
      description.trim().length < 10
    ) {
      toast.error("Please enter valid data");
      return;
    }

    const product = {
      id: nanoid(),
      title,
      thumbnail: image,
      category,
      price,
      description,
    };

    setProducts([...products, product]);
    // localStorage.setItem("products", JSON.stringify([...products, product]))
    toast.success("Product Added Successfully")
    navigate("/")
  };

  return (
    <form
      onSubmit={addProductHandler}
      className="flex flex-col items-center w-full h-screen p-[5%]"
    >
      <h1 className="text-2xl mb-3">Add New Product</h1>
      <input
        className="w-1/2 text-xl p-3 bg-zinc-100 rounded mb-3 outline-zinc-200"
        type="url"
        placeholder="Image link"
        onChange={(e) => {
          setImage(e.target.value);
        }}
        value={image}
      />
      <input
        className="w-1/2 text-xl p-3 bg-zinc-100 rounded mb-3 outline-zinc-200"
        type="text"
        placeholder="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
      />
      <div className="flex gap-3 w-1/2">
        <input
          className="w-1/2 text-xl p-3 bg-zinc-100 rounded mb-3 outline-zinc-200"
          type="text"
          placeholder="Category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          value={category}
        />
        <input
          className="w-1/2 text-xl p-3 bg-zinc-100 rounded mb-3 outline-zinc-200"
          type="number"
          placeholder="Price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
        />
      </div>
      <textarea
        className="w-1/2 text-xl p-3 bg-zinc-100 rounded mb-3 outline-zinc-200"
        placeholder="Enter product descriptio here..."
        rows="7"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        value={description}
      ></textarea>
      <button className="border px-5 py-2 rounded-md border-blue-200 text-blue-300 text-xl cursor-pointer">
        Add New Product
      </button>
    </form>
  );
}

export default Create;

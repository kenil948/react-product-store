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

    if (image.trim().length < 5) {
      toast.error("Please enter a valid image link.");
      return;
    }
    if (title.trim().length < 2) {
      toast.error("Title is too short. Please enter at least 2 characters.");
      return;
    }
    if (category.trim().length < 2) {
      toast.error("Category is too short. Please enter at least 2 characters.");
      return;
    }
    const trimmedPrice = price.trim();
    if (trimmedPrice.length < 1) {
      toast.error("Please enter a price in dollars.");
      return;
    }
    if (isNaN(Number(trimmedPrice)) || Number(trimmedPrice) <= 0) {
      toast.error("Price must be a number greater than $0.");
      return;
    }
    if (!/^\d+(\.\d{1,2})?$/.test(trimmedPrice)) {
      toast.error("Price can have at most 2 decimal places, like 9.99.");
      return;
    }
    const trimmedDesc = description.trim();
    if (trimmedDesc.length < 10) {
      const remaining = 10 - trimmedDesc.length;
      toast.error(`Description is too short. Please add ${remaining} more character${remaining === 1 ? "" : "s"} (minimum 10).`);
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
    toast.success("Product Added Successfully")
    navigate("/")
  };

  return (
    <form
      onSubmit={addProductHandler}
      className="flex flex-col items-center w-full min-h-screen md:h-screen px-5 pb-8 pt-16 sm:p-[5%] sm:pt-16 md:pt-[5%] overflow-y-auto justify-start md:justify-center"
    >
      <h1 className="text-xl sm:text-2xl mb-4 sm:mb-3 font-semibold text-zinc-900 tracking-tight">Add New Product</h1>
      <input
        className="w-full sm:w-3/4 md:w-1/2 text-base sm:text-lg md:text-xl p-3 bg-white border border-zinc-200 rounded-xl mb-3 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10 transition shadow-xs text-zinc-800 placeholder:text-zinc-400"
        type="url"
        placeholder="Image link"
        onChange={(e) => {
          setImage(e.target.value);
        }}
        value={image}
      />
      <input
        className="w-full sm:w-3/4 md:w-1/2 text-base sm:text-lg md:text-xl p-3 bg-white border border-zinc-200 rounded-xl mb-3 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10 transition shadow-xs text-zinc-800 placeholder:text-zinc-400"
        type="text"
        placeholder="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
      />
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-3 w-full sm:w-3/4 md:w-1/2">
        <input
          className="w-full sm:w-1/2 text-base sm:text-lg md:text-xl p-3 bg-white border border-zinc-200 rounded-xl mb-3 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10 transition shadow-xs text-zinc-800 placeholder:text-zinc-400"
          type="text"
          placeholder="Category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          value={category}
        />
        <input
          className="w-full sm:w-1/2 text-base sm:text-lg md:text-xl p-3 bg-white border border-zinc-200 rounded-xl mb-3 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10 transition shadow-xs text-zinc-800 placeholder:text-zinc-400"
          type="number"
          placeholder="Price in USD (e.g. 9.99)"
          min="0.01"
          step="0.01"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
        />
      </div>
      <textarea
        className="w-full sm:w-3/4 md:w-1/2 text-base sm:text-lg md:text-xl p-3 bg-white border border-zinc-200 rounded-xl mb-3 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-900/10 transition shadow-xs text-zinc-800 placeholder:text-zinc-400 resize-none"
        placeholder="Enter product description here..."
        rows="6"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        value={description}
      ></textarea>
      <div className="flex flex-wrap gap-3 sm:gap-4 items-center justify-center w-full sm:w-3/4 md:w-1/2 mt-1">
        <button
          type="submit"
          className="border px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl border-zinc-900 bg-zinc-900 text-white text-sm sm:text-base md:text-xl font-medium shadow-xs hover:bg-zinc-800 transition active:scale-95 cursor-pointer motion-reduce:active:scale-100"
        >
          Add New Product
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="border px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl border-zinc-200 bg-white text-zinc-600 hover:text-zinc-900 text-sm sm:text-base md:text-xl font-medium shadow-xs hover:bg-zinc-50 hover:border-zinc-300 transition active:scale-95 cursor-pointer motion-reduce:active:scale-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default Create;

import { useNavigate, useParams } from "react-router-dom";
import useCreateProduct from "../hooks/useCreateProduct";
import { FormError } from "./Register";
import { useEffect, useState } from "react";
import { useProduct } from "../hooks/useProduct";
import useUpdateProduct from "../hooks/useUpdateProduct";

const EditProduct = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const {
    product,
    isLoading: isLoadingGetProduct,
    error: getProductError,
  } = useProduct(id);

  const {
    mutate,
    isLoading: isLoadingUpdateProduct,
    error: updateProductError,
  } = useUpdateProduct();

  useEffect(() => {
    if (!isLoadingGetProduct) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setBrand(product.brand);
    }
  }, [isLoadingGetProduct]);

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("category", category);
    data.append("brand", brand);
    data.append("description", description);
    if (image) data.append("image", image);

    mutate({ id, data });
  }

  if (isLoadingGetProduct) return <div>Loading..</div>;

  return (
    <>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="font-bold text-slate-600 hover:underline cursor-pointer"
      >
        Go back
      </button>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 text-slate-700 max-w-[500px] mx-auto"
      >
        <h1 className="text-4xl uppercase font-semibold">Create Product</h1>

        {/*error && <FormError>{error}</FormError>*/}

        <div className="flex flex-col gap-2">
          <label>Name</label>
          <input
            value={name}
            type="text"
            className="px-4 py-2 focus:outline-none focus:ring-2 ring-slate-500 transition-all bg-slate-100"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Brand</label>
          <input
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
            type="text"
            className="px-4 py-2 focus:outline-none focus:ring-2 ring-slate-500 transition-all bg-slate-100"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Category</label>
          <input
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            type="text"
            className="px-4 py-2 focus:outline-none focus:ring-2 ring-slate-500 transition-all bg-slate-100"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Description</label>
          <input
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            type="text"
            className="px-4 py-2 focus:outline-none focus:ring-2 ring-slate-500 transition-all bg-slate-100"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Price</label>
          <input
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            type="number"
            className="px-4 py-2 focus:outline-none focus:ring-2 ring-slate-500 transition-all bg-slate-100"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Image</label>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            accept="image/*"
            className="px-4 py-2 focus:outline-none focus:ring-2 ring-slate-500 transition-all bg-slate-100"
          />
        </div>

        <button className="px-4 py-2 bg-slate-700 text-slate-200 text-xl uppercase">
          Update
        </button>
      </form>
    </>
  );
};

export default EditProduct;

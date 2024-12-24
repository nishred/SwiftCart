import Table from "../components/Table";

import { TiTick } from "react-icons/ti";

import { RxCross2 } from "react-icons/rx";

import { MdEdit } from "react-icons/md";
import DeleteUserModal from "../components/DeleteUserModal";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import DeleteProductModal from "../components/DeleteProductModal";
import CartButton from "../components/CartButton";

const ProductList = () => {
  const { products, isLoading, error } = useProducts();

  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex justify-between items-center font-semibold uppercase text-slate-700 my-2">
        <h1 className="text-5xl">Products</h1>
        <button
          onClick={() => {
            navigate("/createproduct");
          }}
          className="px-4 py-2 bg-slate-700 text-slate-100 uppercase rounded-sm"
        >
          Create Product
        </button>
      </div>

      <Table columns={"2fr 2fr 1fr 1fr 1fr 1fr"}>
        <Table.Header>
          <div>ID</div>
          <div>Name</div>
          <div>Price</div>

          <div>Category</div>

          <div>Brand</div>

          <div></div>
        </Table.Header>

        <Table.Body>
          {products.map((product) => {
            return (
              <Table.TableRow key={product._id}>
                <div>{product._id}</div>
                <div>{product.name}</div>
                <div>${product.price}</div>

                <div>{product.category}</div>

                <div>{product.brand}</div>

                <div className="flex gap-4 items-center">
                  <button
                    onClick={() => {
                      navigate(`/editproduct/${product._id}`);
                    }}
                  >
                    <MdEdit />
                  </button>
                  <DeleteProductModal product={product} />
                </div>
              </Table.TableRow>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

export default ProductList;

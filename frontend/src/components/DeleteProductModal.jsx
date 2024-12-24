import useDeleteProduct from "../hooks/useDeleteProduct";
import Modal from "./Modal";
import { FaTrashAlt } from "react-icons/fa";

const DeleteProductModal = ({ product }) => {
  const { mutate, isLoading, error } = useDeleteProduct();

  return (
    <Modal>
      <Modal.ModalButton>
        <FaTrashAlt />
      </Modal.ModalButton>

      <Modal.ModalWindow
        header={"Product delete confirmation"}
        onAccept={() => {
          mutate(product._id);
        }}
      >
        {`Do you want to delete the product ${product.name}(${product._id})`}
      </Modal.ModalWindow>
    </Modal>
  );
};

export default DeleteProductModal;

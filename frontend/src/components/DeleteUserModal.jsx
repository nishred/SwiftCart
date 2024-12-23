import useDeleteUser from "../hooks/useDeleteUser";
import Modal from "./Modal";
import { FaTrashAlt } from "react-icons/fa";

const DeleteUserModal = ({ user }) => {
  const { _id: id, email } = user;

  const { mutate, isLoading, error } = useDeleteUser(id, email);

  return (
    
      <Modal>
        <Modal.ModalButton>
          <FaTrashAlt />
        </Modal.ModalButton>
        <Modal.ModalWindow
          header={"Confirm user deletion"}
          onAccept={() => {
            mutate(id);
          }}
        >
          {`Do you want to delete the user ${email}(${id})?`}
        </Modal.ModalWindow>
      </Modal>
    
  );
};

export default DeleteUserModal;

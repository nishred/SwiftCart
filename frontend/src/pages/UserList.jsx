import Table from "../components/Table";
import useUsers from "../hooks/useUsers";

import { TiTick } from "react-icons/ti";

import { RxCross2 } from "react-icons/rx";

import { MdEdit } from "react-icons/md";
import DeleteUserModal from "../components/DeleteUserModal";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const { users, isLoading, error } = useUsers();

  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h1>Users</h1>

      <Table columns={"2fr 2fr 2fr 1fr 1fr"}>
        <Table.Header>
          <div>ID</div>
          <div>Name</div>
          <div>Email</div>

          <div>Admin</div>

          <div></div>
        </Table.Header>

        <Table.Body>
          {users.map((user) => {
            return (
              <Table.TableRow key={user._id}>
                <div>{user._id}</div>
                <div>{user.name}</div>
                <div>{user.email}</div>

                <div>
                  {user.isAdmin ? (
                    <TiTick color="green" size={32} />
                  ) : (
                    <RxCross2 color="red" size={32} />
                  )}
                </div>

                <div className="flex gap-4 items-center">
                  <button
                    onClick={() => {
                      navigate(`/edituser/${user._id}`);
                    }}
                  >
                    <MdEdit />
                  </button>
                  <DeleteUserModal user={user} />
                </div>
              </Table.TableRow>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};

export default UserList;

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children, isAdmin = false }) => {
  const user = useSelector((store) => store.user);

  const isAuthenticated = Object.keys(user).length > 0;

  const isAuthorized = isAdmin ? user.isAdmin : true;

  return (
    <>
      {isAuthenticated && isAuthorized ? children : <Navigate to={"/signin"} />}
    </>
  );
};

export default Protected;

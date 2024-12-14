import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const user = useSelector((store) => store.user);

  const isAuthenticated = Object.keys(user).length > 0;

  return <>{isAuthenticated ? children : <Navigate to={"/signin"} />}</>;
};

export default Protected;

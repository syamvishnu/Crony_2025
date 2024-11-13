import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedAdmin({ component: Component }) {
  const { user } = useSelector((state) => state.user);
  return user.roll == "admin" ? <Component /> : <Navigate to="/home" />;
}

export default ProtectedAdmin;

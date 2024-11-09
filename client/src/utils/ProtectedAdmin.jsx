import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function ProtectedAdmin({ component: Component }) {
  const { user } = useSelector((state) => state.user);
  console.log(user.roll)
  const auth =  user.role === "admin";

  return auth ? <Component /> : <Navigate to="/home" />;
}

export default ProtectedAdmin;

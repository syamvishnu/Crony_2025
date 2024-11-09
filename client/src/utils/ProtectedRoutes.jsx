import { Navigate } from "react-router-dom";

function ProtectedRoutes({ component: Component }) {
  const user = JSON.parse(localStorage.getItem("user"));; 
  const auth = user;

  return auth ? <Component /> : <Navigate to="/" />;
}

export default ProtectedRoutes;

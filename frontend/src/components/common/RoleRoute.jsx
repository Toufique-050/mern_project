import { Navigate, Outlet } from "react-router-dom"; import { useAuth } from "../../context/AuthContext"; import Loader from "./Loader";
export default function RoleRoute({ allowedRoles }){ const { user, loading }=useAuth(); if(loading)return <Loader/>; if(!user)return <Navigate to="/login" replace/>; return allowedRoles.includes(user.role)?<Outlet/>:<Navigate to="/" replace/>; }

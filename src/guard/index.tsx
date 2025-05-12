import { useContext, type ReactNode } from "react";
import { userContext } from "../context/userContext";
import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const {name, email} = useContext(userContext);
  console.log(name, email);
  if (!name || !email) {
    return <Navigate    to="/login" />;
  }
  return <>{children}</>
}
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";

import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();

  // 🔹 Si pas connecté → redirection vers /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔹 Sinon → on affiche la page protégée
  return children;
}

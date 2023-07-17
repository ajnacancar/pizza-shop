import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, children, redirectTo }) {
  if (user && user.id) {
    return children;
  } else {
    return <Navigate to={`/${redirectTo}`} />;
  }
}

export default ProtectedRoute;

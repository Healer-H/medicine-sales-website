// src/components/ProtectedElement.jsx
import { useAuth } from '../contexts/AuthContext';

const ProtectedElement = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  
  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return children;
};

export default ProtectedElement;
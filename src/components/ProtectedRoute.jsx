import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useAppContext();
  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

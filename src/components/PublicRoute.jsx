import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const PublicRoute = ({ children }) => {
  const { isAuth } = useAppContext();

  if (isAuth) {
    return <Navigate to="/products" replace />;
  }

  return children;
};

export default PublicRoute;
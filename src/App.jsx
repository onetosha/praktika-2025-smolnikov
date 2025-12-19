import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';
import ProductFormPage from './pages/ProductFormPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/products" replace />} />

        <Route path="login" element={<LoginPage />} />

        <Route
          path="products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="products/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="create-product"
          element={
            <ProtectedRoute>
              <ProductFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="edit-product/:id"
          element={
            <ProtectedRoute>
              <ProductFormPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div>Страница не найдена</div>} />
      </Route>
    </Routes>
  );
}

export default App;

import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('app_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (username) => {
    const newUser = { username, token: 'mock-token-123' };
    setUser(newUser);
    localStorage.setItem('app_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('app_user');
  };

  const [localProducts, setLocalProducts] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('my_products');
    if (storedProducts) setLocalProducts(JSON.parse(storedProducts));
  }, []);


  useEffect(() => {
    localStorage.setItem('my_products', JSON.stringify(localProducts));
  }, [localProducts]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      reviews: []
    };
    setLocalProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id, updatedFields) => {
    setLocalProducts((prev) =>
      prev.map((p) => (p.id === Number(id) ? { ...p, ...updatedFields } : p))
    );
  };

  const removeProduct = (id) => {
    setLocalProducts((prev) => prev.filter((p) => p.id !== Number(id)));
  };

  return (
    <AppContext.Provider
      value={{
        isAuth: !!user,
        user,
        login,
        logout,
        localProducts,
        addProduct,
        updateProduct,
        removeProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
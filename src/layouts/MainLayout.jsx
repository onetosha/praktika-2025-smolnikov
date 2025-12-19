import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const MainLayout = () => {
  const { isAuth, user, logout } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="header-user">
          <h1 className="header-brand">Smolnikov Praktika 2025</h1>
          {isAuth && (
            <nav className="nav-links">
              <Link to="/products">Каталог</Link>
              <Link to="/create-product">Добавить товар</Link>
            </nav>
          )}
        </div>

        <div className="header-user">
          {isAuth ? (
            <>
              <span className="user-name">{user?.username}</span>
              <button className="btn btn-outline" style={{color: 'white', borderColor: 'rgba(255,255,255,0.3)'}} onClick={logout}>Выйти</button>
            </>
          ) : (
            <button className="btn btn-outline" style={{color: 'white'}} onClick={() => navigate('/login')}>Войти</button>
          )}
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
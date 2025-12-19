import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
      navigate('/products');
    }
  };

  return (
    <div className="form-container">
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>Вход</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <div className="field" style={{ textAlign: 'left' }}>
            <label>Имя пользователя</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Введите имя..." autoFocus />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Войти</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState('api');
  const [apiProducts, setApiProducts] = useState([]);
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(false);
  const { localProducts, removeProduct } = useAppContext();
  const [showPublishedOnly, setShowPublishedOnly] = useState(false);

  useEffect(() => {
    if (activeTab !== 'api') return;
    setLoading(true);
    const effectiveLimit = limit === 'all' ? 100 : limit;
    fetch(`https://dummyjson.com/products?limit=${effectiveLimit}`)
      .then(res => res.json())
      .then(data => {
        setApiProducts(data.products);
        setLoading(false);
      });
  }, [limit, activeTab]);

  const filteredLocal = showPublishedOnly 
    ? localProducts.filter(p => p.isPublished) 
    : localProducts;

  const handleDeleteLocal = (id) => {
    if (window.confirm('Удалить продукт?')) {
      removeProduct(id);
    }
  };

  return (
    <div>
      <div className="tab-container">
        <button 
          className={`tab-btn ${activeTab === 'api' ? 'active' : ''}`} 
          onClick={() => setActiveTab('api')}
        >
          API Продукты
        </button>
        <button 
          className={`tab-btn ${activeTab === 'local' ? 'active' : ''}`} 
          onClick={() => setActiveTab('local')}
        >
          Мои Продукты ({localProducts.length})
        </button>
      </div>

      {activeTab === 'api' && (
        <>
          <div className="filter-container">
            <button 
              className={`btn btn-outline ${limit === 8 ? 'active' : ''}`} 
              onClick={() => setLimit(8)}
            >
              8
            </button>
            <button 
              className={`btn btn-outline ${limit === 16 ? 'active' : ''}`} 
              onClick={() => setLimit(16)}
            >
              16
            </button>
            <button 
              className={`btn btn-outline ${limit === 'all' ? 'active' : ''}`} 
              onClick={() => setLimit('all')}
            >
              Все
            </button>
          </div>

          {loading ? (
            <p>Загрузка...</p>
          ) : (
            <div className="product-grid">
              {apiProducts.map(p => (
                <div key={p.id} className="card">
                  <div className="card-image-wrapper">
                    <img src={p.thumbnail} alt={p.title} />
                  </div>
                  <h3>{p.title}</h3>
                  <p className="price-text">${p.price}</p>
                  <Link to={`/products/${p.id}`} className="btn btn-primary">Подробнее</Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'local' && (
        <>
          <div className="filter-container">
            <label className="checkbox-group">
              <input 
                type="checkbox" 
                checked={showPublishedOnly} 
                onChange={e => setShowPublishedOnly(e.target.checked)} 
              />
              <span>Только опубликованные</span>
            </label>
          </div>
          
          <div className="product-grid">
            {filteredLocal.map(p => (
              <div key={p.id} className="card">
                <span className={`badge ${p.isPublished ? 'badge-published' : 'badge-draft'}`}>
                  {p.isPublished ? 'Опубликован' : 'Черновик'}
                </span>
                <div className="card-image-wrapper">
                  <img src={p.thumbnail || 'https://via.placeholder.com/150'} alt={p.title} />
                </div>
                <h3>{p.title}</h3>
                <p className="price-text">${p.price}</p>
                <div className="card-actions">
                  <Link to={`/edit-product/${p.id}`} className="btn btn-outline" style={{ flex: 1 }}>
                    Редактировать
                  </Link>
                  <button onClick={() => handleDeleteLocal(p.id)} className="btn btn-danger">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
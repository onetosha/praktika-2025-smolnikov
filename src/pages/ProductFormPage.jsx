import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProduct, updateProduct, localProducts, removeProduct } = useAppContext();
  const isEditMode = !!id;

  const [form, setForm] = useState({
    title: '', price: '', description: '', thumbnail: '', isPublished: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const existing = localProducts.find(p => p.id === Number(id));
      if (existing) setForm(existing);
    }
  }, [id, isEditMode, localProducts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setErrors({ title: 'Название обязательно' });
      return;
    }
    const payload = { ...form, price: Number(form.price) };
    if (isEditMode) updateProduct(id, payload);
    else addProduct(payload);
    navigate('/products');
  };

  return (
    <div className="form-container">
      <div className="card">
        <h2>{isEditMode ? 'Редактировать' : 'Новый товар'}</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <div className="field">
            <label>Название</label>
            <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>
          <div className="field">
            <label>Цена ($)</label>
            <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          </div>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} />
              <span style={{ marginLeft: '8px' }}>Опубликовать</span>
            </label>
          </div>
          <div className="field">
            <label>Описание</label>
            <textarea rows="3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="field">
            <label>Ссылка на фото</label>
            <input type="text" value={form.thumbnail} onChange={e => setForm({ ...form, thumbnail: e.target.value })} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Сохранить</button>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/products')}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormPage;
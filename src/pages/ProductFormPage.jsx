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

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = 'Название обязательно';
    }

    if (!form.price || Number(form.price) <= 0) {
      newErrors.price = 'Цена должна быть больше 0';
    }

    if (!form.description.trim()) {
      newErrors.description = 'Описание обязательно';
    }

    if (form.thumbnail && !form.thumbnail.startsWith('http')) {
      newErrors.thumbnail = 'Ссылка должна начинаться с http:// или https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;

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
            <input 
              type="text" 
              value={form.title} 
              onChange={e => setForm({ ...form, title: e.target.value })} 
              style={errors.title ? { borderColor: 'var(--danger)' } : {}}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="field">
            <label>Цена ($)</label>
            <input 
              type="number" 
              value={form.price} 
              onChange={e => setForm({ ...form, price: e.target.value })}
              style={errors.price ? { borderColor: 'var(--danger)' } : {}}
            />
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>

          <div className="field">
            <label className="checkbox-group">
              <input 
                type="checkbox" 
                checked={form.isPublished} 
                onChange={e => setForm({ ...form, isPublished: e.target.checked })} 
              />
              <span>Опубликовать</span>
            </label>
          </div>

          <div className="field">
            <label>Описание</label>
            <textarea 
              rows="3" 
              value={form.description} 
              onChange={e => setForm({ ...form, description: e.target.value })}
              style={errors.description ? { borderColor: 'var(--danger)' } : {}}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          <div className="field">
            <label>Ссылка на фото</label>
            <input 
              type="text" 
              value={form.thumbnail} 
              onChange={e => setForm({ ...form, thumbnail: e.target.value })}
              style={errors.thumbnail ? { borderColor: 'var(--danger)' } : {}}
            />
            {errors.thumbnail && <span className="error-text">{errors.thumbnail}</span>}
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
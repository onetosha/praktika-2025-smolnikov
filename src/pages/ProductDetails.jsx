import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => { setProduct(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center" style={{ marginTop: '50px' }}>Загрузка...</div>;
  if (!product) return <div className="text-center"><h2>Не найдено</h2><Link to="/products" className="btn btn-primary">Назад</Link></div>;

  return (
    <div className="card">
      <Link to="/products" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>← Вернуться назад</Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={product.thumbnail} alt={product.title} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
        </div>
        
        <div>
          <h1 style={{ margin: '0 0 10px', fontSize: '2rem' }}>{product.title}</h1>
          <div className="d-flex align-center mb-4">
            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>${product.price}</span>
            {product.discountPercentage && (
              <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 10px', borderRadius: '20px', fontWeight: '600' }}>
                -{product.discountPercentage}%
              </span>
            )}
          </div>
          
          <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '30px' }}>
            {product.description}
          </p>

          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', display: 'grid', gap: '10px' }}>
            <div><strong>Категория:</strong> {product.category}</div>
            <div><strong>Бренд:</strong> {product.brand}</div>
            <div><strong>Рейтинг:</strong> {product.rating} ★</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '50px', borderTop: '1px solid var(--border)', paddingTop: '30px' }}>
        <h3 className="mb-4">Отзывы ({product.reviews?.length || 0})</h3>
        <div style={{ display: 'grid', gap: '20px' }}>
          {product.reviews?.map((review, i) => (
            <div key={i} style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '12px' }}>
              <div className="d-flex justify-between mb-4">
                <strong style={{ fontSize: '1.1rem' }}>{review.reviewerName}</strong>
                <span style={{ color: '#f59e0b' }}>{'★'.repeat(review.rating)}</span>
              </div>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{review.comment}</p>
            </div>
          ))}
          {!product.reviews?.length && <p>Нет отзывов.</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
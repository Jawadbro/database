import React, { useState } from 'react';
import api from '../services/api';

function ProductDetails() {
  const [sku, setSku] = useState('');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    if (!sku.trim()) {
      setError('Please enter a SKU');
      return;
    }

    setLoading(true);
    setError(null);
    setProduct(null);

    try {
      const data = await api.getProduct(sku);
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Product Details</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          placeholder="Enter SKU..."
          style={{
            width: '300px',
            padding: '10px',
            fontSize: '14px',
            marginRight: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <button 
          onClick={handleFetch}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Loading...' : 'Get Details'}
        </button>
      </div>

      {error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#e74c3c', 
          color: 'white', 
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      {product && (
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3>{product.name}</h3>
          <table style={{ width: '100%', marginTop: '20px' }}>
            <tbody>
              <tr>
                <td style={{ padding: '8px', fontWeight: 'bold', width: '150px' }}>SKU:</td>
                <td style={{ padding: '8px' }}>{product.sku}</td>
              </tr>
              <tr style={{ backgroundColor: '#f9f9f9' }}>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>Brand:</td>
                <td style={{ padding: '8px' }}>{product.brand || 'N/A'}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>Price:</td>
                <td style={{ padding: '8px' }}>${product.unit_price.toFixed(2)}</td>
              </tr>
              <tr style={{ backgroundColor: '#f9f9f9' }}>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>Category:</td>
                <td style={{ padding: '8px' }}>{product.category || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;

import React, { useState } from 'react';
import api from '../services/api';

function ProductSearch({ onProductSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alpha, setAlpha] = useState(0.6);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await api.searchProducts(query, 20, alpha);
      setResults(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Search Products</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter product name, SKU, or keyword..."
          style={{
            width: '400px',
            padding: '10px',
            fontSize: '14px',
            marginRight: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
        <button 
          onClick={handleSearch}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '14px'
          }}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>
          Search Weight (Alpha): {alpha.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={alpha}
          onChange={(e) => setAlpha(parseFloat(e.target.value))}
          style={{ width: '200px' }}
        />
        <small style={{ display: 'block', color: '#666', marginTop: '5px' }}>
          0 = Keyword only, 1 = Semantic only
        </small>
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

      {results.length > 0 && (
        <div>
          <h3>Results ({results.length})</h3>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#34495e', color: 'white' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>SKU</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Brand</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Price</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Score</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((product, index) => (
                <tr 
                  key={product.sku}
                  style={{ 
                    borderBottom: '1px solid #ddd',
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white'
                  }}
                >
                  <td style={{ padding: '12px' }}>{product.sku}</td>
                  <td style={{ padding: '12px' }}>{product.name}</td>
                  <td style={{ padding: '12px' }}>{product.brand || 'N/A'}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    ${product.unit_price.toFixed(2)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    {product.hybrid_score.toFixed(3)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => onProductSelect(product)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#27ae60',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Add to Quote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProductSearch;

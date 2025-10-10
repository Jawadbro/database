import React, { useState } from 'react';
import api from '../services/api';

function QuoteBuilder({ initialLines = [] }) {
  const [customerRef, setCustomerRef] = useState('WEB_USER');
  const [lines, setLines] = useState(initialLines);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const updateQuantity = (sku, newQty) => {
    if (newQty <= 0) {
      setLines(lines.filter(line => line.sku !== sku));
    } else {
      setLines(lines.map(line => 
        line.sku === sku ? { ...line, qty: newQty } : line
      ));
    }
  };

  const removeLine = (sku) => {
    setLines(lines.filter(line => line.sku !== sku));
  };

  const handleCreateQuote = async () => {
    if (lines.length === 0) {
      setError('Add at least one product to create a quote');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await api.createQuote(customerRef, lines);
      setSuccess(`Quote created successfully! ID: ${result.quoteId}`);
      setLines([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return lines.reduce((sum, line) => {
      const price = line.unit_price || 0;
      return sum + (price * line.qty);
    }, 0);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create Quote</h2>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Customer Reference:
        </label>
        <input
          type="text"
          value={customerRef}
          onChange={(e) => setCustomerRef(e.target.value)}
          style={{
            width: '300px',
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
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

      {success && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#27ae60', 
          color: 'white', 
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {success}
        </div>
      )}

      <h3>Quote Lines ({lines.length})</h3>

      {lines.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          No products added yet. Use the search to add products.
        </p>
      ) : (
        <>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '20px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#34495e', color: 'white' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>SKU</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Unit Price</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Quantity</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Line Total</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, index) => (
                <tr 
                  key={line.sku}
                  style={{ 
                    borderBottom: '1px solid #ddd',
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white'
                  }}
                >
                  <td style={{ padding: '12px' }}>{line.sku}</td>
                  <td style={{ padding: '12px' }}>{line.name || 'Unknown'}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    ${(line.unit_price || 0).toFixed(2)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <input
                      type="number"
                      min="1"
                      value={line.qty}
                      onChange={(e) => updateQuantity(line.sku, parseInt(e.target.value) || 0)}
                      style={{
                        width: '60px',
                        padding: '5px',
                        textAlign: 'center',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                      }}
                    />
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>
                    ${((line.unit_price || 0) * line.qty).toFixed(2)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => removeLine(line.sku)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr style={{ backgroundColor: '#ecf0f1', fontWeight: 'bold' }}>
                <td colSpan="4" style={{ padding: '12px', textAlign: 'right' }}>
                  Total:
                </td>
                <td style={{ padding: '12px', textAlign: 'right', fontSize: '18px' }}>
                  ${calculateTotal().toFixed(2)}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <button
            onClick={handleCreateQuote}
            disabled={loading || lines.length === 0}
            style={{
              padding: '12px 24px',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading || lines.length === 0 ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Creating Quote...' : 'Create Quote'}
          </button>
        </>
      )}
    </div>
  );
}

export default QuoteBuilder;

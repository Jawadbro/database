import React, { useState } from 'react';
import api from '../services/api';

function QuoteViewer() {
  const [quoteId, setQuoteId] = useState('');
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    if (!quoteId.trim()) {
      setError('Please enter a quote ID');
      return;
    }

    setLoading(true);
    setError(null);
    setQuote(null);

    try {
      const data = await api.getQuote(quoteId);
      setQuote(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>View Quote</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={quoteId}
          onChange={(e) => setQuoteId(e.target.value)}
          placeholder="Enter Quote ID (e.g., CRQ-F6333605)..."
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
          {loading ? 'Loading...' : 'Get Quote'}
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

      {quote && (
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3>Quote Details</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '8px', fontWeight: 'bold', width: '200px' }}>Quote ID:</td>
                  <td style={{ padding: '8px' }}>{quote.quote_id}</td>
                </tr>
                <tr style={{ backgroundColor: '#f9f9f9' }}>
                  <td style={{ padding: '8px', fontWeight: 'bold' }}>Customer Reference:</td>
                  <td style={{ padding: '8px' }}>{quote.customer_ref}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px', fontWeight: 'bold' }}>Valid Until:</td>
                  <td style={{ padding: '8px' }}>
                    {new Date(quote.valid_until).toLocaleString()}
                  </td>
                </tr>
                <tr style={{ backgroundColor: '#f9f9f9' }}>
                  <td style={{ padding: '8px', fontWeight: 'bold' }}>List Total:</td>
                  <td style={{ padding: '8px' }}>${quote.list_total.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px', fontWeight: 'bold' }}>Transfer Total:</td>
                  <td style={{ padding: '8px' }}>${quote.transfer_total.toFixed(2)}</td>
                </tr>
                <tr style={{ backgroundColor: '#f9f9f9' }}>
                  <td style={{ padding: '8px', fontWeight: 'bold' }}>Installments Total:</td>
                  <td style={{ padding: '8px' }}>${quote.installments_total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {quote.notes && quote.notes.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h4>Notes:</h4>
              <ul>
                {quote.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          )}

          <h4>Line Items ({quote.lines.length})</h4>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            marginTop: '10px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#34495e', color: 'white' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Line</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>SKU</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Qty</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Unit Price</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Line Total</th>
              </tr>
            </thead>
            <tbody>
              {quote.lines.map((line, index) => (
                <tr 
                  key={line.line_number}
                  style={{ 
                    borderBottom: '1px solid #ddd',
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white'
                  }}
                >
                  <td style={{ padding: '12px' }}>{line.line_number}</td>
                  <td style={{ padding: '12px' }}>{line.sku}</td>
                  <td style={{ padding: '12px' }}>{line.name}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{line.qty}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    ${line.unit_price.toFixed(2)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>
                    ${line.line_total.toFixed(2)}
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

export default QuoteViewer;

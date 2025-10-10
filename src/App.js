import React, { useState } from 'react';
import Navigation from './components/Navigation';
import ProductSearch from './components/ProductSearch';
import QuoteBuilder from './components/QuoteBuilder';
import QuoteViewer from './components/QuoteViewer';

function App() {
  const [activeView, setActiveView] = useState('search');
  const [quoteLines, setQuoteLines] = useState([]);

  const handleProductSelect = (product) => {
    setQuoteLines(prevLines => {
      const existing = prevLines.find(line => line.sku === product.sku);
      if (existing) {
        return prevLines.map(line =>
          line.sku === product.sku 
            ? { ...line, qty: line.qty + 1 } 
            : line
        );
      }
      return [...prevLines, {
        sku: product.sku,
        name: product.name,
        unit_price: product.unit_price,
        qty: 1,
        attributes: {}
      }];
    });
    setActiveView('quote');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#ecf0f1',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0 }}>Casa Rom Sales</h1>
        <p style={{ margin: '5px 0 0 0', opacity: 0.8 }}>
          Product Search & Quote Management System
        </p>
      </header>

      <Navigation activeView={activeView} setActiveView={setActiveView} />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {activeView === 'search' && (
          <ProductSearch onProductSelect={handleProductSelect} />
        )}
        {activeView === 'quote' && (
          <QuoteBuilder initialLines={quoteLines} />
        )}
        {activeView === 'view' && (
          <QuoteViewer />
        )}
      </main>

      <footer style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        textAlign: 'center',
        padding: '15px',
        marginTop: '40px'
      }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          © 2025 Casa Rom Sales - Powered by React & FastAPI
        </p>
      </footer>
    </div>
  );
}

export default App;

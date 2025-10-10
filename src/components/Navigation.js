import React from 'react';

function Navigation({ activeView, setActiveView }) {
  const navStyle = {
    backgroundColor: '#2c3e50',
    padding: '15px',
    marginBottom: '20px'
  };

  const buttonStyle = (isActive) => ({
    backgroundColor: isActive ? '#3498db' : '#34495e',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    marginRight: '10px',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '14px'
  });

  return (
    <nav style={navStyle}>
      <button 
        style={buttonStyle(activeView === 'search')}
        onClick={() => setActiveView('search')}
      >
        Search Products
      </button>
      <button 
        style={buttonStyle(activeView === 'quote')}
        onClick={() => setActiveView('quote')}
      >
        Create Quote
      </button>
      <button 
        style={buttonStyle(activeView === 'view')}
        onClick={() => setActiveView('view')}
      >
        View Quote
      </button>
    </nav>
  );
}

export default Navigation;

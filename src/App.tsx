import React from 'react';

const App: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0', // Un color de fondo gris claro para ser visible
    color: '#333',
    fontSize: '24px',
    fontFamily: 'sans-serif',
    textAlign: 'center',
    padding: '20px',
  };

  return (
    <div style={containerStyle}>
      <p>La aplicación está funcionando.<br />Este es el lienzo.</p>
    </div>
  );
};

export default App;
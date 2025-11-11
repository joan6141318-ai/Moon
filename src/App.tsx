import React from 'react';

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '10px',
  },
  paragraph: {
    fontSize: '1.2rem',
    color: '#666',
    maxWidth: '500px',
  }
};

export default function App() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.header}>Página Limpiada</h1>
        <p style={styles.paragraph}>
          El proyecto anterior ha sido completamente eliminado. Ahora tienes un lienzo en blanco.
          Mis disculpas por los problemas anteriores. ¡Empecemos de nuevo!
        </p>
      </div>
    </div>
  );
}
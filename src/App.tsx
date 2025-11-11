import React from 'react';

const App: React.FC = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Bienvenido a tu Proyecto</h1>
      </header>
      <main style={styles.main}>
        <p style={styles.text}>Mis disculpas por el malentendido anterior.</p>
        <p style={styles.text}>Este es un punto de partida limpio para que puedas comenzar a construir tu aplicación.</p>
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    color: '#ffffff',
  },
  header: {
    marginBottom: '2rem',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '1rem 2rem',
    borderRadius: '10px',
  },
  title: {
    fontSize: '2.5rem',
    color: '#ffffff',
    margin: 0,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
  },
  main: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '1rem 2rem',
    borderRadius: '10px',
  },
  text: {
    fontSize: '1.2rem',
    color: '#ffffff',
    lineHeight: '1.6',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)',
  },
};

export default App;

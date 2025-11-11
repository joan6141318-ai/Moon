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
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
    margin: 0,
  },
  main: {
    padding: '0 1rem',
  },
  text: {
    fontSize: '1.2rem',
    color: '#666',
    lineHeight: '1.6',
  },
};

export default App;

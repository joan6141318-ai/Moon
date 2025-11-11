import React, { CSSProperties } from 'react';

const styles: { [key: string]: CSSProperties } = {
  container: {
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    color: '#FFFFFF',
  }
};

const App: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Proyecto Reiniciado</h1>
    </div>
  );
};

export default App;

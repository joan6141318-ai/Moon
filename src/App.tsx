
import React, { CSSProperties } from 'react';

// SVG Icon Components
const HamburgerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChatIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    <circle cx="12" cy="12" r="1" fill="white" stroke="white" strokeWidth="0.5"/>
    <circle cx="16" cy="12" r="1" fill="white" stroke="white" strokeWidth="0.5"/>
    <circle cx="8" cy="12" r="1" fill="white" stroke="white" strokeWidth="0.5"/>
  </svg>
);


const App: React.FC = () => {
  const styles: { [key: string]: CSSProperties } = {
    container: {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      backgroundColor: '#1a1a1a',
      backgroundImage: `linear-gradient(rgba(10, 5, 15, 0.7), rgba(0, 0, 0, 0.9)), url('https://i.postimg.cc/s2CZZSnL/grok-image-x1fz302.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden',
    },
    header: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      padding: '10px',
      cursor: 'pointer',
      zIndex: 10,
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '0 20px',
      zIndex: 5,
    },
    title: {
      fontSize: 'clamp(3rem, 10vw, 5rem)',
      fontWeight: 800,
      color: '#ffffff',
      margin: '0 0 1rem 0',
      lineHeight: 1.2,
      textShadow: '0 4px 10px rgba(0,0,0,0.5)',
    },
    highlight: {
      color: '#FF5E13',
    },
    subtitle: {
      fontSize: 'clamp(1rem, 4vw, 1.25rem)',
      color: '#e0e0e0',
      maxWidth: '500px',
      margin: '0 0 2rem 0',
      textShadow: '0 2px 5px rgba(0,0,0,0.5)',
    },
    ctaButton: {
      backgroundColor: '#9c27b0',
      color: '#fff',
      border: 'none',
      borderRadius: '50px',
      padding: '16px 32px',
      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '1rem',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
      transition: 'all 0.3s ease',
    },
    chatFab: {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      backgroundColor: '#9c27b0',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      border: 'none',
      boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
      zIndex: 10,
      transition: 'all 0.3s ease',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header} aria-label="Menú principal">
        <HamburgerIcon />
      </header>

      <main style={styles.mainContent}>
        <h1 style={styles.title}>
          Conecta. Crea. <span style={styles.highlight}>Brilla.</span>
        </h1>
        <p style={styles.subtitle}>
          Tu talento merece ser visto.
        </p>
        <button style={styles.ctaButton} className="cta-button">
          Comienza hoy
        </button>
      </main>

      <button style={styles.chatFab} className="chat-fab" aria-label="Abrir chat de ayuda">
        <ChatIcon />
      </button>
    </div>
  );
};

export default App;

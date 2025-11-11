
import React, { useState, CSSProperties, useEffect, useRef } from 'react';

// --- Componentes para la nueva sección "Quiénes somos" ---

const MissionIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#c77dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#c77dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 5.10001V3" stroke="#c77dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.9 12H21" stroke="#c77dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 18.9V21" stroke="#c77dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.10001 12H3" stroke="#c77dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const VisionIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5 7.5L18 5M18 5L20.5 7.5M18 5V12M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C13.7915 6 15.394 6.70221 16.5 7.84357M18 12H21.5" stroke="#c77dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.5 12H7" stroke="#c77dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 3.5V7" stroke="#c77dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const Card: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    
    const cardStyle: CSSProperties = {
        backgroundColor: '#1f1f1f',
        borderRadius: '16px',
        padding: '2rem',
        flex: '1',
        minWidth: '280px',
        margin: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 15px 30px rgba(155, 41, 172, 0.2)' : '0 5px 15px rgba(0, 0, 0, 0.3)',
    };

    const titleStyle: CSSProperties = {
        fontSize: '1.5rem',
        fontWeight: 600,
        color: '#ffffff',
        margin: '1rem 0 0.5rem 0',
    };
    
    const textStyle: CSSProperties = {
        fontSize: '0.95rem',
        color: '#cccccc',
        lineHeight: 1.7,
    };
    
    return (
        <div 
            style={cardStyle} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {icon}
            <h3 style={titleStyle}>{title}</h3>
            <p style={textStyle}>{children}</p>
        </div>
    );
};

const AboutSection: React.FC = () => {
    const styles: { [key: string]: CSSProperties } = {
        section: {
            backgroundColor: '#0d0d0d',
            padding: ' clamp(3rem, 8vw, 6rem) 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        },
        title: {
            fontSize: 'clamp(2rem, 5vw, 2.8rem)',
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: '1rem',
        },
        highlight: {
          color: '#9b29ac',
        },
        description: {
            fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
            color: '#e0e0e0',
            maxWidth: '800px',
            lineHeight: 1.8,
            marginBottom: '4rem',
        },
        cardsContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            width: '100%',
            maxWidth: '1200px',
        },
    };
    
    return (
        <section style={styles.section}>
            <h2 style={styles.title}>Quiénes <span style={styles.highlight}>somos</span></h2>
            <p style={styles.description}>
                Somos una agencia de talentos para plataformas de streaming con más de 7 años de experiencia. Nos especializamos en descubrir y potenciar a creadores de contenido, conectándolos con las plataformas más influyentes a nivel global. Nuestra comunidad, que supera los 400 talentos activos, es el testimonio de nuestro compromiso con el crecimiento profesional y el éxito sostenible en la industria.
            </p>
            <div style={styles.cardsContainer}>
                 <Card icon={<MissionIcon />} title="Misión">
                    Impulsar a creadores de contenido emergentes, proporcionándoles las herramientas, la estrategia y las conexiones necesarias para que transformen su pasión en una carrera profesional exitosa y de gran impacto.
                </Card>
                <Card icon={<VisionIcon />} title="Visión">
                    Ser la agencia de talentos líder y el referente global en la industria del streaming, construyendo un ecosistema donde el talento innovador y las plataformas de contenido se unen para crear el futuro del entretenimiento digital.
                </Card>
            </div>
        </section>
    );
};


// --- Componentes de la App principal ---

const HamburgerIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
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

const XIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);
  const [isChatFabVisible, setIsChatFabVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lastHoveredElementRef = useRef<Element | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsChatFabVisible(true);
      } else {
        setIsChatFabVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const navElement = navRef.current;
    if (!isMenuOpen || !navElement) return;

    const handleTouchMove = (event: TouchEvent) => {
        const touch = event.touches[0];
        if (!touch) return;

        const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
        const newHoveredElement = elementUnderTouch?.closest('.menu-link');
        const lastHoveredElement = lastHoveredElementRef.current;
        
        if (newHoveredElement === lastHoveredElement) {
            return;
        }

        if (lastHoveredElement) {
            lastHoveredElement.classList.remove('touch-hover');
        }

        if (newHoveredElement) {
            newHoveredElement.classList.add('touch-hover');
            lastHoveredElementRef.current = newHoveredElement;
        } else {
            lastHoveredElementRef.current = null;
        }
    };

    const handleTouchStart = (event: TouchEvent) => {
        event.preventDefault();
        setSelectedMenuItem(null);
        handleTouchMove(event);
    };

    const handleTouchEnd = () => {
        const lastHoveredElement = lastHoveredElementRef.current;
        if (lastHoveredElement) {
            const selectedText = lastHoveredElement.textContent;
            if (selectedText) {
              setSelectedMenuItem(selectedText);
            }
            lastHoveredElement.classList.remove('touch-hover');
            lastHoveredElementRef.current = null;
        }
    };

    navElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    navElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    navElement.addEventListener('touchend', handleTouchEnd);
    navElement.addEventListener('touchcancel', handleTouchEnd);

    return () => {
        navElement.removeEventListener('touchstart', handleTouchStart);
        navElement.removeEventListener('touchmove', handleTouchMove);
        navElement.removeEventListener('touchend', handleTouchEnd);
        navElement.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [isMenuOpen]);

  const styles: { [key: string]: CSSProperties } = {
    heroSection: {
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: '#1a1a1a',
      backgroundImage: `linear-gradient(to top, rgba(155, 41, 172, 0.02), transparent 50%), linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url('https://i.postimg.cc/4yVxtSjg/IMG-20251111-053352.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden',
    },
    header: {
      position: 'absolute',
      top: '5px',
      right: '5px',
      padding: '10px',
      cursor: 'pointer',
      zIndex: 10,
      background: 'none',
      border: 'none',
    },
    mainContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '0 20px',
      zIndex: 5,
    },
    title: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: 'clamp(2.5rem, 8vw, 5rem)',
      fontWeight: 800,
      color: '#ffffff',
      margin: '0 0 0.5rem 0',
      lineHeight: 1.2,
      textShadow: '0 4px 10px rgba(0,0,0,0.5)',
      whiteSpace: 'nowrap',
    },
    highlight: {
      color: '#9b29ac',
    },
    subtitle: {
      fontSize: 'clamp(0.8rem, 3.5vw, 1.1rem)',
      color: '#f0f0f0',
      maxWidth: '500px',
      margin: '0 0 1.5rem 0',
      textShadow: '0 2px 5px rgba(0,0,0,0.5)',
    },
    ctaButton: {
      backgroundColor: '#7a1ea3',
      color: '#fff',
      border: 'none',
      borderRadius: '50px',
      padding: '16px 32px',
      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
      fontWeight: 600,
      cursor: 'pointer',
      marginTop: '0.5rem',
      textTransform: 'none',
      letterSpacing: '0.5px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
      transition: 'all 0.3s ease',
    },
    chatFab: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#7a1ea3',
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
      opacity: isChatFabVisible ? 1 : 0,
      visibility: isChatFabVisible ? 'visible' : 'hidden',
      transform: isChatFabVisible ? 'scale(1)' : 'scale(0.5)',
      transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
    },
    menuOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 15,
      opacity: isMenuOpen ? 1 : 0,
      visibility: isMenuOpen ? 'visible' : 'hidden',
      transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
    },
    sideMenu: {
      position: 'fixed',
      top: 0,
      right: 0,
      width: '300px',
      height: 'auto',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      zIndex: 20,
      transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
      opacity: isMenuOpen ? 1 : 0,
      transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      paddingBottom: '30px',
      boxSizing: 'border-box',
      visibility: isMenuOpen ? 'visible' : 'hidden',
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: '5px',
    },
    menuNav: {
      marginTop: '60px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  };

  const menuItems = ['Inicio', 'Sobre nosotros', 'Únete', 'Socios', 'Podcast', 'Preguntas frecuentes', 'Contacto', 'Chat'];

  return (
    <div>
      <div style={styles.menuOverlay} onClick={() => setIsMenuOpen(false)}></div>
      <aside style={styles.sideMenu} aria-hidden={!isMenuOpen}>
        <button style={styles.closeButton} className="close-button" onClick={() => setIsMenuOpen(false)} aria-label="Cerrar menú">
          <XIcon />
        </button>
        <nav ref={navRef} style={styles.menuNav}>
          {menuItems.map(item => (
            <a 
              key={item} 
              href="#" 
              className={`menu-link ${selectedMenuItem === item ? 'selected' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setSelectedMenuItem(item);
              }}
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      <div style={styles.heroSection}>
        <button style={styles.header} className="header-button" aria-label="Abrir menú principal" onClick={() => setIsMenuOpen(true)}>
          <HamburgerIcon />
        </button>
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
      </div>
      
      <AboutSection />

      <button style={styles.chatFab} className="chat-fab" aria-label="Abrir chat de ayuda">
        <ChatIcon />
      </button>
    </div>
  );
};

export default App;

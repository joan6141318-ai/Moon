
import React, { useState, CSSProperties, useEffect, useRef } from 'react';

// --- SECCIÓN "QUIÉNES SOMOS" REDISEÑADA ---

const InfoCard: React.FC<{ 
    title?: string; 
    text?: string;
    imageUrl: string; 
    isMobile: boolean;
    minHeight?: string;
}> = ({ title, text, imageUrl, isMobile, minHeight = '250px' }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const cardStyle: CSSProperties = {
        position: 'relative',
        height: '100%',
        minHeight: minHeight,
        borderRadius: '20px',
        overflow: 'hidden',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(2.5rem, 6vw, 4rem)',
        boxSizing: 'border-box',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'transform 0.3s ease-in-out',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        cursor: 'default',
        textAlign: 'center',
    };

    const overlayStyle: CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
    };

    const contentStyle: CSSProperties = {
        position: 'relative',
        zIndex: 2,
        maxWidth: '750px',
    };

    const titleStyle: CSSProperties = {
        fontSize: 'clamp(1.3rem, 3vw, 1.75rem)',
        fontWeight: 600,
        margin: '0 0 1.25rem 0',
    };
    
    const textStyle: CSSProperties = {
        fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
        lineHeight: 1.8,
        opacity: 0.9,
        margin: 0,
    };
    
    const innerBorderStyle: CSSProperties = {
        position: 'absolute',
        top: '1.5rem',
        left: '1.5rem',
        right: '1.5rem',
        bottom: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        opacity: 0.8,
    };

    return (
        <div 
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={overlayStyle}></div>
            <div style={innerBorderStyle}></div>
            <div style={contentStyle}>
                {title && <h3 style={titleStyle}>{title}</h3>}
                {text && <p style={textStyle}>{text}</p>}
            </div>
        </div>
    );
};

const MissionIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#c77dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const VisionIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#c77dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    text: string;
}> = ({ icon, title, text }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const cardStyle: CSSProperties = {
        backgroundColor: '#1a1a1c',
        borderRadius: '16px',
        padding: 'clamp(1.75rem, 5vw, 2.25rem) clamp(2.25rem, 6vw, 2.75rem)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        height: '100%',
        boxSizing: 'border-box',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
        borderColor: isHovered ? '#9b29ac' : 'rgba(255, 255, 255, 0.1)',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
    };
    
    const iconStyle: CSSProperties = { marginBottom: '1.25rem' };
    const titleStyle: CSSProperties = {
        fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)',
        fontWeight: 600,
        color: '#ffffff',
        margin: '0 0 1rem 0',
    };
    const textStyle: CSSProperties = {
        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
        lineHeight: 1.7,
        color: '#b0b0b0',
        margin: 0,
        flexGrow: 1,
    };

    return (
        <div 
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={iconStyle}>{icon}</div>
            <h3 style={titleStyle}>{title}</h3>
            <p style={textStyle}>{text}</p>
        </div>
    );
};

const AboutSection: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
    const styles: { [key: string]: CSSProperties } = {
        section: {
            backgroundColor: '#0d0d0d',
            padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 4rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2.5rem',
        },
        title: {
            fontSize: 'clamp(2.2rem, 5vw, 3rem)',
            fontWeight: 800,
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '1.5rem',
        },
        highlight: {
            color: '#9b29ac',
        },
        mainCardWrapper: {
            maxWidth: '1200px',
            width: '100%',
        },
    };
    
    return (
        <section style={styles.section}>
            <h2 style={styles.title}>Quiénes <span style={styles.highlight}>Somos</span></h2>
            
            <div style={styles.mainCardWrapper}>
                <InfoCard 
                    imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                    title="Más de 7 años de experiencia"
                    text="Somos una agencia de talentos para plataformas de streaming. Nos especializamos en descubrir y potenciar a creadores de contenido, conectándolos con las plataformas más influyentes a nivel global. Nuestra comunidad, que supera los 400 talentos activos, es el testimonio de nuestro compromiso."
                    isMobile={isMobile}
                    minHeight={isMobile ? '300px' : '400px'}
                />
            </div>

            <div className="features-grid">
                 <FeatureCard 
                    icon={<MissionIcon />}
                    title="Misión"
                    text="Impulsar el talento emergente, proporcionando las herramientas y la visibilidad necesarias para transformar la pasión en una carrera profesional de éxito."
                />
                <FeatureCard 
                    icon={<VisionIcon />}
                    title="Visión"
                    text="Ser la agencia de talentos líder y más respetada en el ecosistema digital, reconocida por nuestra integridad, innovación y el impacto positivo en la vida de nuestros creadores."
                />
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navRef = useRef<HTMLElement>(null);
  const lastHoveredElementRef = useRef<Element | null>(null);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      maxHeight: '100vh',
      overflowY: 'auto',
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
      <aside style={styles.sideMenu} className="side-menu" aria-hidden={!isMenuOpen}>
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
      
      <AboutSection isMobile={isMobile} />

      <button style={styles.chatFab} className="chat-fab" aria-label="Abrir chat de ayuda">
        <ChatIcon />
      </button>
    </div>
  );
};

export default App;

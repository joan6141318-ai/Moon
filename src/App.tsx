
import React, { useState, CSSProperties, useEffect, useRef } from 'react';

// --- Íconos ---

const HamburgerIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
    <path d="M3 12H21" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 6H21" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 18H21" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChatIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

const CloseIcon = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 6L18 18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// --- Componentes ---

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const headerStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 5%',
    zIndex: 1000,
    transition: 'background-color 0.3s ease-in-out',
    backgroundColor: 'rgba(13, 13, 13, 0.85)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  };

  const logoStyle: CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'white',
  };

  const headerButtonStyle: CSSProperties = {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: '8px',
  };

  return (
    <header style={headerStyle}>
      <a href="#" style={logoStyle}>Agency</a>
      <button onClick={onMenuClick} style={headerButtonStyle} className="header-button" aria-label="Abrir menú">
        <HamburgerIcon />
      </button>
    </header>
  );
};

const SideMenu = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const navRef = useRef<HTMLElement>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    useEffect(() => {
        if (!isOpen) {
            setSelectedItem(null);
            setHoveredItem(null);
        }
    }, [isOpen]);

    const handleTouchStart = (e: React.TouchEvent) => {
        setSelectedItem(null);
        handleTouchMove(e);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element.tagName === 'A' && navRef.current?.contains(element)) {
            const menuItem = element as HTMLAnchorElement;
            setHoveredItem(menuItem.innerText);
        } else {
            setHoveredItem(null);
        }
    };

    const handleTouchEnd = () => {
        if (hoveredItem) {
            setSelectedItem(hoveredItem);
        }
        setHoveredItem(null);
    };

    const menuItems = ['Inicio', 'Servicios', 'Talentos', 'Blog', 'Contacto'];
    
    const menuOverlayStyle: CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
        transition: 'opacity 0.3s ease, visibility 0.3s ease',
        zIndex: 1100,
    };
    
    const menuContentStyle: CSSProperties = {
        position: 'fixed',
        top: 0,
        right: 0,
        width: '300px',
        height: '100%',
        backgroundColor: '#111',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out',
        padding: '80px 20px 20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
    };

    const closeButtonStyle: CSSProperties = {
        position: 'absolute',
        top: '25px',
        right: '25px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    };

    return (
        <div style={menuOverlayStyle} onClick={onClose}>
            <nav 
                ref={navRef}
                style={menuContentStyle} 
                className="side-menu"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <button style={closeButtonStyle} onClick={onClose} className="close-button" aria-label="Cerrar menú">
                    <CloseIcon />
                </button>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' }}>
                    {menuItems.map((item) => (
                        <li key={item} style={{ marginBottom: '10px', width: '100%' }}>
                            <a href="#" className={`menu-link ${hoveredItem === item ? 'touch-hover' : ''} ${selectedItem === item ? 'selected' : ''}`}
                               onClick={(e) => { e.preventDefault(); setSelectedItem(item); }}
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

const HeroSection = () => {
    const mainStyle: CSSProperties = {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 20px',
        position: 'relative',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const contentStyle: CSSProperties = {
        position: 'relative',
        zIndex: 1,
    };

    const titleStyle: CSSProperties = {
        fontSize: `clamp(2.5rem, 10vw, 6rem)`,
        fontWeight: 800,
        margin: '0',
        lineHeight: 1.2,
    };

    const subtitleStyle: CSSProperties = {
        fontSize: `clamp(0.85rem, 4vw, 1.2rem)`,
        margin: '20px 0 30px',
        maxWidth: '600px',
    };

    const ctaButtonStyle: CSSProperties = {
        backgroundColor: '#9b29ac',
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        padding: '15px 35px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
    };

    return (
        <main style={mainStyle}>
            <div style={contentStyle}>
                <h1 style={titleStyle}>
                    Conecta. Crea. <span style={{ color: '#c77dff' }}>Brilla.</span>
                </h1>
                <p style={subtitleStyle}>Tu talento merece ser visto.</p>
                <a href="#" style={ctaButtonStyle} className="cta-button">
                    Comienza hoy
                </a>
            </div>
        </main>
    );
};

const AboutSection = () => {
    const aboutSectionStyle: CSSProperties = {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 3rem)',
        overflow: 'hidden',
    };

    const contentWrapperStyle: CSSProperties = {
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '700px',
    };
    
    const cardContainerStyle: CSSProperties = {
      width: '100%'
    };

    const aboutCardStyle: CSSProperties = {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.125)',
        borderRadius: '24px',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        textAlign: 'center',
        boxShadow: '0 0 10px rgba(155, 41, 172, 0.2), 0 0 20px rgba(155, 41, 172, 0.1)',
    };
    
    const experienceTitleStyle: CSSProperties = {
        fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
        fontWeight: 600,
        margin: '0 0 1rem 0',
    };

    const descriptionStyle: CSSProperties = {
        fontSize: 'clamp(0.9rem, 2vw, 1rem)',
        lineHeight: 1.7,
        margin: 0,
        color: '#d1d1d1',
        textAlign: 'center',
    };

    const purpleSpanStyle: CSSProperties = {
        color: '#c77dff',
        fontWeight: 600,
    };

    const sectionTitleStyle: CSSProperties = {
        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
        fontWeight: 800,
        textAlign: 'center',
        marginBottom: '2rem',
    };

    return (
        <section style={aboutSectionStyle}>
            <div style={contentWrapperStyle}>
                <h2 style={sectionTitleStyle}>
                    Quiénes <span style={{ color: '#9b29ac' }}>Somos</span>
                </h2>
                <div style={cardContainerStyle}>
                    <div
                        style={aboutCardStyle}
                    >
                        <h3 style={experienceTitleStyle}>Más de 7 años de experiencia</h3>
                        <p style={descriptionStyle}>
                            Somos una agencia de talentos para plataformas de streaming. Nos especializamos en descubrir y potenciar a creadores de contenido, conectándolos con las plataformas más influyentes a nivel global. Nuestra comunidad, que supera los <span style={purpleSpanStyle}>400</span> talentos activos, es el testimonio de nuestro compromiso.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ChatFab = ({ isVisible }: { isVisible: boolean }) => {
    const fabStyle: CSSProperties = {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#9b29ac',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        zIndex: 1050,
        transition: 'transform 0.3s ease, background-color 0.3s ease, opacity 0.3s ease',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.5)',
    };

    return (
        <div style={fabStyle} className="chat-fab" aria-label="Abrir chat">
            <ChatIcon />
        </div>
    );
};


export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showFab, setShowFab] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        const handleScroll = () => {
            const fabThreshold = window.innerHeight * 0.5;
            setShowFab(window.scrollY > fabThreshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Header onMenuClick={toggleMenu} />
            <SideMenu isOpen={isMenuOpen} onClose={toggleMenu} />
            <HeroSection />
            <AboutSection />
            <ChatFab isVisible={showFab} />
        </>
    );
}
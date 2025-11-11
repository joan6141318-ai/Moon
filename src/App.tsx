import React, { CSSProperties, useState, useEffect } from 'react';
import { GrowthIcon, CommunityIcon, SupportIcon } from './components/icons';

// --- STYLES ---
const styles: { [key: string]: CSSProperties } = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
    transition: 'background-color 0.3s ease',
    boxSizing: 'border-box'
  },
  logo: {
    fontFamily: 'var(--font-title)',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'var(--text-primary)',
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  navLink: {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    fontSize: '1rem',
  },
  navLinkHover: {
    color: 'var(--primary-purple)',
  },
  hero: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 2rem',
    background: 'linear-gradient(180deg, #000000 0%, #1A0D2E 100%)',
    position: 'relative',
    overflow: 'hidden'
  },
  heroContent: {
    textAlign: 'center',
    zIndex: 2,
  },
  heroTitle: {
    fontFamily: 'var(--font-title)',
    fontSize: '4.5rem',
    fontWeight: 700,
    margin: '0 0 1rem 0',
    lineHeight: 1.2,
    background: 'linear-gradient(90deg, #FFFFFF, #BDBDBD)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: 'var(--text-secondary)',
    maxWidth: '600px',
    margin: '0 auto 2rem auto',
  },
  heroImage: {
    position: 'absolute',
    bottom: '-10%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '800px',
    opacity: 0.15,
    zIndex: 0,
  },
  features: {
    padding: '6rem 2rem',
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: 'var(--font-title)',
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  sectionSubtitle: {
    color: 'var(--text-secondary)',
    marginBottom: '4rem',
    maxWidth: '600px',
    margin: '0 auto 4rem auto',
  },
  featureGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  featureCard: {
    backgroundColor: '#111',
    padding: '2.5rem 2rem',
    borderRadius: '12px',
    maxWidth: '320px',
    textAlign: 'left',
    border: '1px solid #222',
  },
  cardIcon: {
    marginBottom: '1.5rem',
  },
  cardTitle: {
    fontFamily: 'var(--font-title)',
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
  },
  cardText: {
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
  hamburger: {
      display: 'none',
      flexDirection: 'column',
      cursor: 'pointer',
      gap: '4px'
  },
  hamburgerLine: {
      width: '25px',
      height: '3px',
      backgroundColor: 'white',
      borderRadius: '3px',
      transition: 'all 0.3s ease'
  },
  mobileNav: {
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
      padding: '2rem 0'
  }
};


// --- COMPONENTS ---

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const NavLinks = () => (
    <>
      <a href="#features" style={styles.navLink} onMouseOver={e => e.currentTarget.style.color = styles.navLinkHover.color} onMouseOut={e => e.currentTarget.style.color = styles.navLink.color}>Características</a>
      <a href="#" style={styles.navLink} onMouseOver={e => e.currentTarget.style.color = styles.navLinkHover.color} onMouseOut={e => e.currentTarget.style.color = styles.navLink.color}>Sobre nosotros</a>
      <a href="#" style={styles.navLink} onMouseOver={e => e.currentTarget.style.color = styles.navLinkHover.color} onMouseOut={e => e.currentTarget.style.color = styles.navLink.color}>Contacto</a>
      <a href="#" className="btn">Únete ahora</a>
    </>
  );

  return (
    <header style={{...styles.header, backgroundColor: isScrolled ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)'}}>
      <a href="#" style={styles.logo}>Agency Moon</a>
      {isMobile ? (
          <>
            <div style={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div style={styles.hamburgerLine}></div>
              <div style={styles.hamburgerLine}></div>
              <div style={styles.hamburgerLine}></div>
            </div>
            {isMenuOpen && (
              <div style={styles.mobileNav}>
                <NavLinks />
              </div>
            )}
          </>
        ) : (
          <nav style={styles.nav}>
             <NavLinks />
          </nav>
        )}
    </header>
  );
};


const Hero = () => (
  <section style={styles.hero}>
    <div style={styles.heroContent} className="hero-content">
      <h1 style={styles.heroTitle}>Conecta. Crea. Brilla.</h1>
      <p style={styles.heroSubtitle}>Tu talento merece ser visto. Únete a una agencia que impulsa tu carrera en el mundo del streaming.</p>
      <a href="#" className="btn">Comienza hoy</a>
    </div>
     <img src="https://storage.googleapis.com/maker-studio-5f2c2.appspot.com/assets/influencer_setup.png" alt="Influencer setup" style={styles.heroImage} />
  </section>
);


const Features = () => (
  <section id="features" style={styles.features}>
    <h2 style={styles.sectionTitle}>Por Qué Elegirnos</h2>
    <p style={styles.sectionSubtitle}>Ofrecemos las herramientas y el apoyo que necesitas para crecer y monetizar tu pasión.</p>
    <div style={styles.featureGrid} className="feature-grid">
      <div style={styles.featureCard} className="feature-card">
        <div style={styles.cardIcon}><GrowthIcon /></div>
        <h3 style={styles.cardTitle}>Crecimiento Estratégico</h3>
        <p style={styles.cardText}>Analizamos tu contenido y creamos una hoja de ruta personalizada para maximizar tu alcance y engagement.</p>
      </div>
      <div style={styles.featureCard} className="feature-card">
        <div style={styles.cardIcon}><CommunityIcon /></div>
        <h3 style={styles.cardTitle}>Comunidad Exclusiva</h3>
        <p style={styles.cardText}>Accede a una red de creadores de élite, colabora en proyectos y participa en eventos privados.</p>
      </div>
      <div style={styles.featureCard} className="feature-card">
        <div style={styles.cardIcon}><SupportIcon /></div>
        <h3 style={styles.cardTitle}>Soporte Dedicado</h3>
        <p style={styles.cardText}>Nuestro equipo está disponible 24/7 para ayudarte con soporte técnico, legal y de patrocinio.</p>
      </div>
    </div>
  </section>
);


const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
    </>
  );
};

export default App;
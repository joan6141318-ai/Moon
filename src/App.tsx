import React, { CSSProperties } from 'react';
import { GrowthIcon, CommunityIcon, SupportIcon } from './components/icons';

// --- STYLES ---
const styles: { [key: string]: CSSProperties } = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    padding: '1rem 5%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    borderBottom: '1px solid rgba(123, 31, 162, 0.2)',
  },
  logo: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'var(--text-main)',
    textDecoration: 'none',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'color 0.3s ease',
  },
  // --- Hero Section ---
  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    minHeight: '100vh',
    padding: '80px 1rem',
    background: 'linear-gradient(180deg, rgba(0,0,0,1) 70%, rgba(31,0,44,1) 100%)',
    overflow: 'hidden',
    position: 'relative',
  },
  heroContent: {
    maxWidth: '800px',
    position: 'relative',
    zIndex: 2,
  },
  heroTitle: {
    fontSize: 'clamp(3rem, 10vw, 5.5rem)',
    fontWeight: 700,
    lineHeight: 1.1,
    marginBottom: '1rem',
    background: 'linear-gradient(90deg, #FFFFFF, #E0C3FC)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontSize: 'clamp(1rem, 4vw, 1.25rem)',
    color: 'var(--text-secondary)',
    marginBottom: '2rem',
    maxWidth: '600px',
    margin: '0 auto 2.5rem auto',
  },
  // --- Features Section ---
  features: {
    padding: '100px 5%',
    backgroundColor: 'var(--bg-main)',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: 'var(--text-main)',
  },
  sectionSubtitle: {
    fontSize: '1.1rem',
    color: 'var(--text-secondary)',
    marginBottom: '4rem',
    maxWidth: '600px',
    margin: '0 auto 4rem auto',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  featureCard: {
    backgroundColor: '#111',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #222',
    transition: 'all 0.3s ease',
  },
  cardIcon: {
    marginBottom: '1.5rem',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  cardDescription: {
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  },
};

// --- COMPONENTS ---

const Header: React.FC = () => {
  const handleNavLinkHover = (e: React.MouseEvent<HTMLAnchorElement>, isHovering: boolean) => {
    e.currentTarget.style.color = isHovering ? 'var(--purple-main)' : 'var(--text-secondary)';
  };

  return (
    <header style={styles.header}>
      <a href="#" style={styles.logo}>Agency Moon</a>
      <nav style={styles.nav} className="header-nav">
        <a href="#features" style={styles.navLink} onMouseEnter={(e) => handleNavLinkHover(e, true)} onMouseLeave={(e) => handleNavLinkHover(e, false)}>Características</a>
        <a href="#" style={styles.navLink} onMouseEnter={(e) => handleNavLinkHover(e, true)} onMouseLeave={(e) => handleNavLinkHover(e, false)}>Talentos</a>
        <a href="#" style={styles.navLink} onMouseEnter={(e) => handleNavLinkHover(e, true)} onMouseLeave={(e) => handleNavLinkHover(e, false)}>Contacto</a>
      </nav>
      <a href="#" className="btn">Únete ahora</a>
    </header>
  );
};

const Hero: React.FC = () => {
  return (
    <section style={styles.hero}>
      <div style={styles.heroContent} className="hero-content">
        <h1 style={styles.heroTitle}>Conecta. Crea. Brilla.</h1>
        <p style={styles.heroSubtitle}>Tu talento merece ser visto. Amplificamos tu voz y te conectamos con las marcas más grandes del mundo.</p>
        <a href="#" className="btn">Comienza hoy</a>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div style={styles.featureCard} className="feature-card">
    <div style={styles.cardIcon}>{icon}</div>
    <h3 style={styles.cardTitle}>{title}</h3>
    <p style={styles.cardDescription}>{description}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section id="features" style={styles.features}>
      <h2 style={styles.sectionTitle}>Impulsa tu Carrera</h2>
      <p style={styles.sectionSubtitle}>Te proporcionamos las herramientas y el apoyo que necesitas para crecer y monetizar tu pasión.</p>
      <div style={styles.featuresGrid} className="features-grid">
        <FeatureCard 
          icon={<GrowthIcon />}
          title="Crecimiento Estratégico"
          description="Planes personalizados para aumentar tu audiencia, engagement y visibilidad en todas las plataformas."
        />
        <FeatureCard 
          icon={<CommunityIcon />}
          title="Comunidad Exclusiva"
          description="Accede a una red de creadores de élite, colabora y aprende de los mejores en la industria."
        />
        <FeatureCard 
          icon={<SupportIcon />}
          title="Soporte Dedicado"
          description="Un equipo de expertos a tu disposición 24/7 para manejar negociaciones, patrocinios y logística."
        />
      </div>
    </section>
  );
};

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
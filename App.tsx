import React, { useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { FAQItem, PaymentTier, InfoTab } from './types';
import { Logo, ChevronDownIcon, YoutubeIcon, WhatsappIcon, XIcon, ChevronLeftIcon, ChevronRightIcon, MenuIcon } from './components/icons';
import { Chatbot } from './components/Chatbot';


// --- Navigation Helper ---
const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href || href === '#') return;
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        // The 'scroll-padding-top' CSS property on the html element will handle the offset
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};


// --- Reusable UI Components ---
const Section: React.FC<{ id: string; children: ReactNode; className?: string }> = ({ id, children, className = '' }) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0', 'translate-y-4');
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <section
            ref={ref}
            id={id}
            className={`w-full max-w-6xl mx-auto px-6 py-12 opacity-0 translate-y-4 transition-all duration-700 ease-out ${className}`}
        >
            {children}
        </section>
    );
};

const GlowButton: React.FC<{ children: ReactNode, href?: string, className?: string, onClick?: (e: React.MouseEvent<HTMLElement>) => void }> = ({ children, href, className, onClick }) => {
    const classes = `inline-block bg-purple-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-[0_0_25px_rgba(168,85,247,0.9)] focus:outline-none focus:ring-4 focus:ring-purple-400/50 transform hover:scale-105 ${className}`;

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (href && href.startsWith('#') && e.currentTarget.tagName === 'A') {
            handleSmoothScroll(e as React.MouseEvent<HTMLAnchorElement>);
        }
        if (onClick) {
            onClick(e);
        }
    };

    if (href) {
        return (
            <a href={href} className={classes} onClick={handleClick}>
                {children}
            </a>
        );
    }

    return (
        <button onClick={handleClick} className={classes}>
            {children}
        </button>
    );
};


// --- Modal Component ---
const JoinModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleContactClick = (e: React.MouseEvent<HTMLElement>) => {
        if ((e.currentTarget as HTMLAnchorElement).href.startsWith('#')) {
            handleSmoothScroll(e as React.MouseEvent<HTMLAnchorElement>);
        }
        onClose(); // Close modal after clicking contact
    };

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="join-modal-title"
        >
            <div
                className="relative bg-gray-900 rounded-2xl p-8 md:p-12 border border-purple-500/30 text-center max-w-lg w-full animate-zoom-in"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    aria-label="Cerrar"
                >
                    <XIcon className="w-6 h-6" />
                </button>
                <h2 id="join-modal-title" className="text-3xl md:text-4xl font-bold text-white mb-4">¿Listo para brillar?</h2>
                <p className="text-gray-400 max-w-3xl mx-auto mb-8">Cumple con estos requisitos y da el primer paso para monetizar tu talento.</p>
                <div className="inline-block text-left max-w-md mx-auto mb-8">
                    <ul className="list-none space-y-3">
                        <li className="flex items-center text-gray-300"><span className="text-purple-400 mr-3 text-xl">✓</span> Edad: 18 a 35 años.</li>
                        <li className="flex items-center text-gray-300"><span className="text-purple-400 mr-3 text-xl">✓</span> Disponibilidad: Mínimo 2 horas diarias.</li>
                        <li className="flex items-center text-gray-300"><span className="text-purple-400 mr-3 text-xl">✓</span> Buena conexión a Internet e iluminación.</li>
                        <li className="flex items-center text-gray-300"><span className="text-purple-400 mr-3 text-xl">✓</span> Personalidad carismática y proactiva.</li>
                    </ul>
                </div>
                <div>
                    <GlowButton href="#contact" onClick={handleContactClick}>Contactar por WhatsApp</GlowButton>
                </div>
            </div>
        </div>
    );
};

// --- Page Section Components ---

const Header: React.FC<{ onOpenJoinModal: () => void }> = ({ onOpenJoinModal }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setIsMenuOpen(false);
        if (href === '#join-modal') {
            e.preventDefault();
            onOpenJoinModal();
        } else {
            handleSmoothScroll(e);
        }
    };
    
    const navLinks = [
        { name: 'Quiénes somos', href: '#about' },
        { name: 'Experiencia', href: '#experience' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Pagos', href: '#payments' },
        { name: 'Información', href: '#info' },
        { name: 'Tips', href: '#tips' },
        { name: 'Talentos', href: '#talents'},
        { name: 'Socios', href: '#partnership' },
        { name: 'Contacto', href: '#contact' },
    ];

    const mobileNavLinks = [
        { name: 'Quiénes Somos', href: '#about' },
        { name: 'Nuestra Experiencia', href: '#experience' },
        { name: 'Requisitos para Unirte', href: '#join-modal' },
        { name: 'Preguntas Frecuentes', href: '#faq' },
        { name: 'Tabla de Pagos', href: '#payments' },
        { name: 'Tips de Transmisión', href: '#tips' },
        { name: 'Nuestros Talentos', href: '#talents' },
        { name: 'Sé Nuestro Socio', href: '#partnership' },
        { name: 'Contáctanos', href: '#contact' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'}`}>
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#home" onClick={handleSmoothScroll} className="flex items-center gap-2">
                    <Logo className="h-8 w-auto text-white" />
                    <span className="text-white font-bold text-xl">Agency Moon</span>
                </a>
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                         <a key={link.name} href={link.href} onClick={handleSmoothScroll} className="text-gray-300 hover:text-white transition-colors hover:text-shadow-purple">{link.name}</a>
                    ))}
                </div>
                 <GlowButton onClick={onOpenJoinModal} className="hidden md:inline-block">Únete ahora</GlowButton>
                 <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none" aria-label="Abrir menú">
                        {isMenuOpen ? <XIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
                    </button>
                </div>
            </nav>
            {isMenuOpen && (
                 <div className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-sm animate-fade-in-down-fast">
                    <div className="flex flex-col items-start px-6 py-4 space-y-1">
                        {mobileNavLinks.map(link => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-gray-200 hover:bg-purple-600/30 hover:text-white w-full text-left py-3 px-3 rounded-md transition-colors text-lg"
                                onClick={(e) => handleMenuClick(e, link.href)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                 </div>
            )}
        </header>
    );
};

const Hero: React.FC<{ onOpenJoinModal: () => void }> = ({ onOpenJoinModal }) => (
    <section id="home" className="h-screen min-h-[700px] w-full flex items-center justify-center relative text-white text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black z-0">
            <video 
                autoPlay 
                loop 
                muted 
                playsInline
                poster="https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="w-full h-full object-cover opacity-50"
            >
                <source src="https://videos.pexels.com/video-files/3132388/3132388-hd_1920_1080_30fps.mp4" type="video/mp4" />
                Tu navegador no soporta la etiqueta de video.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-down" style={{textShadow: '0 0 15px rgba(168, 85, 247, 0.7)'}}>Haz brillar tu talento con Agency Moon</h1>
            <p className="text-lg md:text-xl max-w-3xl mb-8 text-gray-300 animate-fade-in-up">Únete a nuestra comunidad de creadores y empieza a monetizar tus transmisiones.</p>
            <div className="animate-fade-in-up animation-delay-300">
                <GlowButton onClick={onOpenJoinModal}>Únete ahora</GlowButton>
            </div>
        </div>
    </section>
);

const AboutUs: React.FC = () => (
    <Section id="about" className="bg-gray-900/50 rounded-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">Quiénes Somos</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-2">Nuestra Misión</h3>
                <p className="text-gray-300 leading-relaxed">Potenciar a los creadores de contenido, brindándoles las mejores oportunidades para que puedan convertir su pasión en una carrera profesional exitosa y sostenible.</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-2">Nuestra Visión</h3>
                <p className="text-gray-300 leading-relaxed">Ser la agencia líder a nivel mundial en la representación de talentos de streaming, reconocida por nuestra innovación, transparencia y el éxito de nuestros creadores.</p>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-2">Nuestros Valores</h3>
                <p className="text-gray-300 leading-relaxed">Compromiso, profesionalismo, comunidad y crecimiento constante. Creemos en el potencial de cada streamer y trabajamos para hacerlo brillar.</p>
            </div>
        </div>
    </Section>
);

const ProgressBar: React.FC<{ label: string; percentage: number; isInView: boolean }> = ({ label, percentage, isInView }) => (
    <div className="mb-6">
        <div className="flex justify-between items-center mb-2 gap-4">
            <span className="text-gray-300 font-medium text-sm">{label}</span>
            <span className="text-purple-300 font-bold text-lg flex-shrink-0">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2.5 border border-purple-500/30">
            <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: isInView ? `${percentage}%` : '0%' }}
            ></div>
        </div>
    </div>
);

const ExperienceSection: React.FC = () => {
    const [isInView, setIsInView] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.5, // Animate when 50% of the element is visible
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <Section id="experience">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-purple-900/40">
                    <img 
                        src="https://i.postimg.cc/k6yWdWb1/IMG-20251030-074627.png"
                        alt="Grupo de streamers colaborando en una transmisión en vivo"
                        className="w-full h-auto object-cover" 
                    />
                </div>
                <div ref={sectionRef}>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Nuestra Experiencia Impulsa Tu Éxito
                    </h2>
                    <p className="text-gray-300 md:text-lg mb-8">
                        Nuestros streamers, influencers y creadores de contenido crecen más rápido a comparación de streamers independientes, esto nos convierte en la agencia líder en nuestras plataformas de trabajo.
                    </p>
                    <div>
                        <ProgressBar label="Streamers Con Metas Alcanzadas" percentage={92} isInView={isInView} />
                        <ProgressBar label="Emisores con más de 2 años activos" percentage={80} isInView={isInView} />
                        <ProgressBar label="Promedio de Emisores que superan los 800 usd mensuales" percentage={96} isInView={isInView} />
                    </div>
                </div>
            </div>
        </Section>
    );
};

const Banner: React.FC = () => {
    return (
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/50 border border-purple-500/30">
            <img 
                src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Gráfico de crecimiento y éxito financiero, representando los logros de la agencia" 
                className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-purple-900/70 to-transparent"></div>
            <div className="relative z-10 flex items-center justify-start text-left min-h-[280px]">
                <div className="max-w-md p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight" style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>
                        Convierte tu Pasión en una Carrera Profesional
                    </h2>
                    <p className="text-gray-200 mb-8" style={{textShadow: '0 1px 5px rgba(0,0,0,0.5)'}}>
                       Te proporcionamos las herramientas, el soporte 24/7 y una comunidad que te impulsa a crecer. Con cero comisiones, todo lo que generas es 100% tuyo. Es hora de que tu talento brille.
                    </p>
                    <GlowButton href="#faq">
                        Descubre Cómo
                    </GlowButton>
                </div>
            </div>
        </div>
    );
};


const AccordionItem: React.FC<{ item: FAQItem, isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => (
    <div className="bg-gray-900/50 rounded-lg border border-purple-500/30 mb-3 transition-all duration-300 hover:border-purple-400">
        <button onClick={onClick} className="w-full flex justify-between items-center text-left p-5" aria-expanded={isOpen}>
            <span className="text-lg font-medium text-white">{item.question}</span>
            <ChevronDownIcon className={`w-6 h-6 text-purple-400 transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
            <div className="text-gray-300 px-5 pb-5 text-base leading-relaxed faq-answer" dangerouslySetInnerHTML={{ __html: item.answer }} />
        </div>
    </div>
);


const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const faqData: FAQItem[] = [
        {
            question: '¿Qué beneficios obtengo si me uno a agencia Agency Moon?',
            answer: `<p>Nos complace que te intereses en nuestro equipo. Nuestro diferenciador es que como emisor obtendrás:</p>
                     <ul>
                         <li><strong>Atención y Soporte 24/7:</strong> Atención personalizada para resolver cualquier duda.</li>
                         <li><strong>Información Oficial:</strong> Acceso a actualizaciones y novedades de la plataforma.</li>
                         <li><strong>Comunidad Exclusiva:</strong> Oportunidad de participar en dinámicas y pertenecer a un grupo exclusivo de creadores.</li>
                         <li><strong>Incentivos Adicionales:</strong> Bonos por cumplimiento de objetivos y acceso a nuestro programa de referidos.</li>
                     </ul>`
        },
        {
            question: '¿Qué necesito para poder transmitir?',
            answer: `<p>Para formar parte de nuestro equipo, es fundamental que cumplas con los siguientes requisitos:</p>
                     <ul>
                         <li><strong>Edad:</strong> 18 a 35 años.</li>
                         <li><strong>Disponibilidad:</strong> Mínimo 2 horas diarias para tus transmisiones.</li>
                         <li><strong>Equipo:</strong> Contar con una buena conexión a internet y una iluminación adecuada.</li>
                         <li><strong>Personalidad:</strong> Ser una persona carismática y proactiva.</li>
                     </ul>`
        },
        {
            question: 'Nunca hice una transmisión en vivo, ¿Ustedes me pueden enseñar y ayudar?',
            answer: '<p>¡Por supuesto! Entendemos que empezar puede ser un desafío. Nuestro equipo de managers te brindará capacitación inicial, guías y soporte constante para que te sientas seguro/a frente a la cámara. Te enseñaremos las mejores prácticas y te acompañaremos en tu crecimiento.</p>'
        },
        {
            question: '¿Tendré un horario de trabajo?',
            answer: '<p>No tienes un horario de trabajo fijo. Ofrecemos total flexibilidad. Solo necesitas cumplir con una meta de 2 horas de transmisión diarias, las cuales puedes realizar en el horario que mejor se adapte a tu rutina.</p>'
        },
        {
            question: '¿Cuánto dinero puedo ganar con ustedes?',
            answer: 'Tus ganancias dependen directamente de tu desempeño y del cumplimiento de las metas de semillas. Puedes consultar nuestra <a href="#payments">Tabla de Pagos</a> para ver el potencial de ingresos. ¡El cielo es el límite!'
        },
        {
            question: '¿Su agencia me cobrará comisión, o me quitará parte de mi dinero?',
            answer: '<p>Absolutamente no. Uno de nuestros mayores beneficios es que no cobramos ningún tipo de comisión ni porcentaje. Todo el dinero que generes a través de la plataforma es 100% tuyo.</p>'
        },
        {
            question: '¿Tendré que dar la clave o contraseña de mi cuenta?',
            answer: '<strong>¡Nunca!</strong> Jamás te pediremos tu contraseña ni información sensible de tu cuenta. La seguridad de tu cuenta es tuya y solo tuya. Nuestro rol es guiarte y apoyarte, no administrar tu perfil.'
        },
        {
            question: '¿Qué debo hacer para empezar a trabajar con ustedes?',
            answer: '<p>Es muy sencillo. Primero, asegúrate de cumplir con los requisitos básicos. Luego, haz clic en el botón "Únete ahora" o contáctanos directamente por WhatsApp. Uno de nuestros managers te guiará en el proceso de registro y bienvenida.</p>'
        },
        {
            question: 'Si decido retirarme por alguna emergencia, ¿me cobrarán alguna penalización?',
            answer: '<p>No. Entendemos que las emergencias ocurren. No existe ningún tipo de penalización, contrato de permanencia o cobro si decides retirarte. Puedes hacerlo en cualquier momento sin compromiso.</p>'
        },
    ];

    return (
        <Section id="faq">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Preguntas Frecuentes</h2>
            
            <div className="max-w-2xl mx-auto mb-12">
                <div
                    className="block rounded-2xl overflow-hidden shadow-lg shadow-purple-900/50 border border-purple-500/20"
                >
                    <img 
                        src='https://i.postimg.cc/s2RrM0nj/IMG-20251107-154910.png' 
                        alt='Guía de bienvenida para nuevos streamers de Agency Moon' 
                        className="w-full h-auto"
                    />
                </div>
            </div>

            <div className="max-w-3xl mx-auto">
                {faqData.map((item, index) => (
                    <AccordionItem key={index} item={item} isOpen={openIndex === index} onClick={() => setOpenIndex(openIndex === index ? null : index)} />
                ))}
            </div>
        </Section>
    );
};

const PaymentsTable: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const paymentData: PaymentTier[] = [
        { level: 'A', seedsGoal: '2,000', dailyHours: '2', monthlyHours: '44', remuneration: '$14', seedExchange: '$9', totalPayment: '$23' },
        { level: 'B', seedsGoal: '5,000', dailyHours: '2', monthlyHours: '44', remuneration: '$35', seedExchange: '$23', totalPayment: '$58' },
        { level: 'C', seedsGoal: '10,000', dailyHours: '2', monthlyHours: '44', remuneration: '$74', seedExchange: '$48', totalPayment: '$122' },
        { level: 'CE', seedsGoal: '20,000', dailyHours: '2', monthlyHours: '44', remuneration: '$141', seedExchange: '$95', totalPayment: '$236' },
        { level: 'D', seedsGoal: '30,000', dailyHours: '2', monthlyHours: '44', remuneration: '$211', seedExchange: '$143', totalPayment: '$354' },
        { level: 'E', seedsGoal: '60,000', dailyHours: '2', monthlyHours: '44', remuneration: '$422', seedExchange: '$286', totalPayment: '$708' },
        { level: 'S1', seedsGoal: '100,000', dailyHours: '2', monthlyHours: '44', remuneration: '$660', seedExchange: '$476', totalPayment: '$1,136' },
        { level: 'S2', seedsGoal: '150,000', dailyHours: '2', monthlyHours: '44', remuneration: '$990', seedExchange: '$714', totalPayment: '$1,704' },
        { level: 'S3', seedsGoal: '200,000', dailyHours: '2', monthlyHours: '44', remuneration: '$1,320', seedExchange: '$952', totalPayment: '$2,272' },
        { level: 'S4', seedsGoal: '250,000', dailyHours: '2', monthlyHours: '44', remuneration: '$1,650', seedExchange: '$1,190', totalPayment: '$2,840' },
        { level: 'S5', seedsGoal: '300,000', dailyHours: '2', monthlyHours: '44', remuneration: '$1,980', seedExchange: '$1,429', totalPayment: '$3,409' },
        { level: 'S6', seedsGoal: '400,000', dailyHours: '2', monthlyHours: '44', remuneration: '$2,700', seedExchange: '$1,905', totalPayment: '$4,604' },
        { level: 'S7', seedsGoal: '500,000', dailyHours: '2', monthlyHours: '44', remuneration: '$3,550', seedExchange: '$2,381', totalPayment: '$5,931' },
        { level: 'S8', seedsGoal: '750,000', dailyHours: '2', monthlyHours: '44', remuneration: '$5,500', seedExchange: '$3,572', totalPayment: '$9,072' },
        { level: 'S9', seedsGoal: '1,000,000', dailyHours: '2', monthlyHours: '44', remuneration: '$6,800', seedExchange: '$4,762', totalPayment: '$11,562' },
        { level: 'S10', seedsGoal: '1,500,000', dailyHours: '2', monthlyHours: '44', remuneration: '$10,400', seedExchange: '$7,143', totalPayment: '$17,543' },
        { level: 'S11', seedsGoal: '2,000,000', dailyHours: '2', monthlyHours: '44', remuneration: '$14,500', seedExchange: '$9,524', totalPayment: '$24,024' },
        { level: 'S12', seedsGoal: '3,000,000', dailyHours: '2', monthlyHours: '44', remuneration: '$22,500', seedExchange: '$14,286', totalPayment: '$36,786' },
    ];
    return (
        <Section id="payments">
            <div className="w-full max-w-full mx-auto">
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="w-full flex justify-between items-center text-left p-5 bg-gray-900/50 rounded-t-lg border border-purple-500/30 hover:bg-gray-800/70 transition-colors"
                    aria-expanded={isOpen}
                    aria-controls="payments-table-content"
                >
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Tabla de Pagos Bigo Live</h2>
                        <p className="text-gray-400 mt-1">Consulta las metas y remuneraciones para nuestros streamers. (Haz clic para expandir)</p>
                    </div>
                    <ChevronDownIcon className={`w-8 h-8 text-purple-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div 
                    id="payments-table-content"
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[4000px] md:max-h-[2000px]' : 'max-h-0'}`}
                >
                    <div className="p-1 md:p-0 border border-t-0 border-purple-500/30 rounded-b-lg">
                        <div className="max-w-full mx-auto overflow-x-auto">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden bg-gray-900/50">
                                    <table className="payment-table min-w-full text-center text-gray-300">
                                        <thead className="hidden md:table-header-group bg-purple-900/40 text-white uppercase text-xs tracking-wider">
                                            <tr>
                                                <th className="px-4 py-3">Nivel</th>
                                                <th className="px-4 py-3">Meta Semillas</th>
                                                <th className="px-4 py-3">Horas/Día</th>
                                                <th className="px-4 py-3">Horas/Mes</th>
                                                <th className="px-4 py-3">Remuneración (USD)</th>
                                                <th className="px-4 py-3">Cambio Semillas (USD)</th>
                                                <th className="px-4 py-3 font-bold text-purple-300">Pago Total (USD)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-purple-500/20">
                                            {paymentData.map((tier) => (
                                                <tr key={tier.level} className="md:hover:bg-purple-900/20 transition-colors">
                                                    <td data-label="Nivel" className="px-4 py-3 whitespace-nowrap font-bold text-purple-400">{tier.level}</td>
                                                    <td data-label="Meta Semillas" className="px-4 py-3 whitespace-nowrap">{tier.seedsGoal}</td>
                                                    <td data-label="Horas/Día" className="px-4 py-3 whitespace-nowrap">{tier.dailyHours}</td>
                                                    <td data-label="Horas/Mes" className="px-4 py-3 whitespace-nowrap">{tier.monthlyHours}</td>
                                                    <td data-label="Remuneración (USD)" className="px-4 py-3 whitespace-nowrap">{tier.remuneration}</td>
                                                    <td data-label="Cambio Semillas (USD)" className="px-4 py-3 whitespace-nowrap">{tier.seedExchange}</td>
                                                    <td data-label="Pago Total (USD)" className="px-4 py-3 whitespace-nowrap font-bold text-lg text-purple-300">{tier.totalPayment}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                         <div className="max-w-4xl mx-auto mt-6 text-center text-gray-400 text-sm p-4 bg-gray-900/50 rounded-lg border border-purple-500/30 m-4">
                            <p><strong>Nota importante:</strong> Cada transmisión debe durar por lo menos 1 hora para contar como hora válida. Cada día se contará como máximo 2 horas válidas. Por ejemplo si un emisor transmite 58 minutos un día, no tiene hora válida. Si un emisor transmite 3 horas un día, se le contarán solamente 2 horas válidas.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

const InfoAccordionItem: React.FC<{ item: InfoTab, isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => (
    <div className="bg-gray-900/50 rounded-lg border border-purple-500/30 mb-4 transition-all duration-300 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
        <button 
            onClick={onClick} 
            className="w-full flex justify-between items-center text-left p-6"
            aria-expanded={isOpen}
        >
            <span className="text-xl font-bold text-white">{item.title}</span>
            <ChevronDownIcon className={`w-6 h-6 text-purple-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
            <div className="text-gray-300 px-6 pb-6 space-y-4">
                {item.content}
            </div>
        </div>
    </div>
);

const GeneralInfo: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const infoData: InfoTab[] = [
        {
            title: '¿Qué es un PK?',
            content: (
                <>
                    <p>Un PK (Player Knockout) es una batalla en vivo entre dos streamers. Los espectadores envían regalos para apoyar a su creador favorito, y quien reciba más valor en regalos gana la batalla. Es una excelente forma de interactuar y aumentar la monetización.</p>
                    <div className="mt-4">
                        <a 
                            href="https://youtu.be/UbstkEfHweE?si=LEQHshF_LWPU00rv" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-300 border border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.7)] transform hover:-translate-y-1"
                        >
                            <YoutubeIcon className="w-6 h-6" />
                            Cómo hacer un PK
                        </a>
                    </div>
                </>
            )
        },
        { 
            title: 'Bloqueos', 
            content: (
                <>
                    <p>Los bloqueos en la plataforma pueden ocurrir por violaciones de las normas de la comunidad. Nuestro equipo te asesora sobre las mejores prácticas para evitar bloqueos y te asiste en caso de que ocurra uno para resolverlo lo antes posible.</p>
                    <div className="mt-4">
                        <a 
                            href="https://youtu.be/cIcz_999ZZc?si=ie_POk4ipUV_2vFs" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-300 border border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.7)] transform hover:-translate-y-1"
                        >
                            <YoutubeIcon className="w-6 h-6" />
                            Aprende a evitar bloqueos
                        </a>
                    </div>
                </>
            )
        },
        { title: 'Live Data', content: <p>Te proporcionamos acceso a un panel de control con datos en tiempo real de tus transmisiones. Analiza métricas clave como espectadores, duración, regalos recibidos y más, para optimizar tu contenido y estrategia de crecimiento.</p> },
        { title: 'Horas de Transmisión', content: <p>Las horas de transmisión son un factor clave para tu crecimiento y monetización. Establecemos metas de horas mensuales que, al cumplirse, desbloquean recompensas y bonificaciones. La consistencia es fundamental para el éxito.</p> },
    ];
    
    return (
        <Section id="info">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">Información General</h2>
            <div className="max-w-4xl mx-auto">
                {infoData.map((item, index) => (
                    <InfoAccordionItem 
                        key={index}
                        item={item} 
                        isOpen={openIndex === index} 
                        onClick={() => setOpenIndex(openIndex === index ? null : index)} 
                    />
                ))}
            </div>
        </Section>
    );
};

const TipsSection: React.FC = () => {
    const [isTipsModalOpen, setIsTipsModalOpen] = useState(false);
    const [currentTipIndex, setCurrentTipIndex] = useState(0);

    const tipsImages = [
        'https://i.postimg.cc/xCscRJt2/2-20251030-105515-0001.png',
        'https://i.postimg.cc/YSY9JDRQ/3-20251030-105515-0002.png',
        'https://i.postimg.cc/JnzfbGs1/4-20251030-105515-0003.png',
        'https://i.postimg.cc/8PfjRCv2/5-20251030-105515-0004.png',
        'https://i.postimg.cc/NFrP4TBF/6-20251030-105515-0005.png',
    ];

    const nextTip = () => {
        setCurrentTipIndex(prevIndex => (prevIndex + 1) % tipsImages.length);
    };

    const prevTip = () => {
        setCurrentTipIndex(prevIndex => (prevIndex - 1 + tipsImages.length) % tipsImages.length);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isTipsModalOpen) return;
            if (event.key === 'ArrowRight') {
                nextTip();
            } else if (event.key === 'ArrowLeft') {
                prevTip();
            } else if (event.key === 'Escape') {
                setIsTipsModalOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTipsModalOpen]);

    return (
        <>
            <Section id="tips">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Tips para tu Transmisión</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        Mejora la calidad de tus transmisiones y aumenta tu audiencia con nuestros consejos profesionales. Haz clic para ver nuestra galería de tips.
                    </p>
                    <GlowButton onClick={() => setIsTipsModalOpen(true)}>
                        Ver Galería de Tips
                    </GlowButton>
                </div>
            </Section>

            {isTipsModalOpen && (
                <div 
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setIsTipsModalOpen(false)}
                    role="dialog"
                    aria-modal="true"
                >
                    <div 
                        className="relative w-full max-w-3xl animate-zoom-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative aspect-[4/5] sm:aspect-video overflow-hidden rounded-lg bg-black/30 shadow-2xl shadow-purple-500/40">
                            {tipsImages.map((src, index) => (
                                <img 
                                    key={src}
                                    src={src} 
                                    alt={`Tip de transmisión ${index + 1}`} 
                                    className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-300 ease-in-out ${index === currentTipIndex ? 'opacity-100' : 'opacity-0'}`}
                                    aria-hidden={index !== currentTipIndex}
                                />
                            ))}

                            <button
                                onClick={prevTip}
                                className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-purple-600 transition-colors z-10"
                                aria-label="Anterior"
                            >
                                <ChevronLeftIcon className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextTip}
                                className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-purple-600 transition-colors z-10"
                                aria-label="Siguiente"
                            >
                                <ChevronRightIcon className="w-6 h-6" />
                            </button>
                            
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {tipsImages.map((_, index) => (
                                    <button 
                                        key={index}
                                        onClick={() => setCurrentTipIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all ${index === currentTipIndex ? 'bg-purple-500 scale-125' : 'bg-gray-600 hover:bg-gray-400'}`}
                                        aria-label={`Ir al tip ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                       
                        <button 
                            onClick={() => setIsTipsModalOpen(false)}
                            className="absolute -top-3 -right-3 text-white bg-purple-600 rounded-full p-2 hover:bg-purple-700 transition-colors"
                            aria-label="Cerrar"
                        >
                            <XIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

const TalentsSection: React.FC = () => {
    const talentData = [
        { name: "steficupcake", image: 'https://i.postimg.cc/N0Z5jrFK/IMG-20251107-193051.jpg', description: "Record historico: 4.5 Millones | País: Colombia" },
        { name: "Shinysoul_turtle", image: 'https://i.postimg.cc/kBFfgdFT/IMG-20251107-193553.jpg', description: "Record historico: 3.8 Millones | País: México" },
        { name: "lbm0312", image: 'https://i.postimg.cc/rpn71VcF/In-Shot-20251107-185715214.jpg', description: "Record histórico: 3 Millones | País: Colombia" },
        { name: "boanquita_", image: 'https://i.postimg.cc/R0Mtzmk6/IMG-20251107-183411.png', description: "Record histórico: 1 Millón | País: Colombia" },
        { name: "Thunderblack", image: 'https://i.postimg.cc/sDg6cF6w/In-Shot-20251107-192231700.jpg', description: "Record histórico: 1 Millón | País: República Dominicana" },
        { name: "Tuvenus", image: 'https://i.postimg.cc/BLzQFy5W/IMG-20251107-194701.jpg', description: "Récord histórico: 800k | País: Venezuela" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [openInfoIndex, setOpenInfoIndex] = useState<number | null>(null);
    // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setInterval> to resolve TypeScript error in browser environment.
    const autoPlayRef = useRef<ReturnType<typeof setInterval>>();

    const nextSlide = useCallback(() => {
        setOpenInfoIndex(null);
        setCurrentIndex(prev => prev === talentData.length - 1 ? 0 : prev + 1);
    }, [talentData.length]);

    useEffect(() => {
        autoPlayRef.current = setInterval(nextSlide, 3000);
        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, [nextSlide]);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? talentData.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        setOpenInfoIndex(null);
    };

    const nextSlideManual = () => {
        const isLastSlide = currentIndex === talentData.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setOpenInfoIndex(null);
    };
    
    const handleToggleInfo = (index: number) => {
        setOpenInfoIndex(openInfoIndex === index ? null : index);
    };

    // Helper to render formatted description
    const renderDescription = (description: string) => {
        if (description.includes('|')) {
            const parts = description.split('|').map(p => p.trim());
            return (
                <div className="text-gray-300 text-sm space-y-1 text-left">
                    {parts.map(part => {
                        const [key, value] = part.split(':');
                        if (key && value) {
                            return (
                                <p key={key}>
                                    <strong className="font-semibold text-purple-400">{key}:</strong>
                                    <span className="ml-2">{value.trim()}</span>
                                </p>
                            );
                        }
                        return <p key={part}>{part}</p>; // Fallback for parts without ':'
                    })}
                </div>
            );
        }
        return <p className="text-gray-300 text-sm">{description}</p>;
    };

    return (
        <Section id="talents">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Conoce a Nuestros Talentos</h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                    Descubre a los creadores que forman parte de la familia Agency Moon. Cada uno con un estilo único y una pasión por el streaming.
                </p>
            </div>
            <div 
                className="relative w-full max-w-xs mx-auto h-[50vh] max-h-[400px]"
                onMouseEnter={() => { if(autoPlayRef.current) clearInterval(autoPlayRef.current); }}
                onMouseLeave={() => { autoPlayRef.current = setInterval(nextSlide, 3000); }}
            >
                {/* Carousel viewport */}
                <div className="relative w-full h-full overflow-hidden">
                    {talentData.map((talent, index) => (
                        <div
                            key={index}
                            className="absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
                            aria-hidden={index !== currentIndex}
                        >
                             {/* Talent Card */}
                             <div className="talent-card relative w-full h-full rounded-2xl overflow-hidden shadow-lg shadow-purple-900/50 border border-purple-500/30 flex flex-col justify-end bg-gray-800 transition-all duration-300 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                                <img 
                                    src={talent.image} 
                                    alt={`Talento de Agency Moon: ${talent.name}`} 
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-[2]"></div>
                                <div className="relative z-10 text-white p-4 w-full">
                                     {/* Clickable Info Toggle */}
                                     <div 
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => handleToggleInfo(index)}
                                        role="button"
                                        aria-expanded={openInfoIndex === index}
                                     >
                                        <h3 className="text-xl font-bold">{talent.name}</h3>
                                        <ChevronDownIcon className={`w-6 h-6 transition-transform duration-300 ${openInfoIndex === index ? 'rotate-180' : ''}`} />
                                     </div>
                                     {/* Expandable Info Panel */}
                                     <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openInfoIndex === index ? 'max-h-40 mt-2' : 'max-h-0'}`}>
                                        {renderDescription(talent.description)}
                                     </div>
                                </div>
                             </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-purple-600 transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    aria-label="Anterior Talento"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <button
                    onClick={nextSlideManual}
                    className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-purple-600 transition-colors z-20 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    aria-label="Siguiente Talento"
                >
                    <ChevronRightIcon className="w-6 h-6" />
                </button>
                
                {/* Navigation Dots */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                    {talentData.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentIndex(index);
                                setOpenInfoIndex(null);
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-purple-500 scale-125' : 'bg-gray-600 hover:bg-gray-400'}`}
                            aria-label={`Ir al talento ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
};

const PartnershipSection: React.FC = () => (
    <Section id="partnership">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/50 border border-purple-500/30 text-center">
            <img 
                src="https://images.pexels.com/photos/7645300/pexels-photo-7645300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Agente de negocios sonriendo en un entorno de oficina moderno" 
                className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            <div className="relative z-10 p-8 md:p-12">
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight" style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>
                    Forma tu propia agencia o sé uno de nuestros agentes en Latinoamérica
                </h2>
                <p className="text-gray-200 md:text-lg mb-8 max-w-2xl mx-auto" style={{textShadow: '0 1px 5px rgba(0,0,0,0.5)'}}>
                    Actualmente buscamos socios comerciales o agentes que quieran trabajar con nosotros en la empresa. Expande tus horizontes y crece profesionalmente en la industria del streaming.
                </p>
                <GlowButton href="#contact">
                    Más Información
                </GlowButton>
            </div>
        </div>
    </Section>
);

const Contact: React.FC = () => (
    <Section id="contact">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">Contacto Directo</h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            ¿Tienes preguntas más específicas o prefieres hablar directamente con un manager? Contáctanos a través de WhatsApp. Estamos aquí para ayudarte.
        </p>
        <div className="flex justify-center">
             <div className="w-full max-w-md p-6 bg-gray-900/50 rounded-xl border border-purple-500/30 text-center transition-all duration-300 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                <WhatsappIcon className="w-12 h-12 mb-4 mx-auto text-white" />
                <h3 className="text-xl font-semibold text-white mb-4">Contactar Managers</h3>
                <div className="space-y-4">
                    <a
                        href="https://wa.me/528118807625"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block w-full p-3 bg-gray-800/60 rounded-lg border border-transparent hover:border-purple-500/50 hover:bg-gray-800/90 transition-all duration-300"
                    >
                         <span className="text-gray-300 group-hover:text-white font-medium">Manager 1 - Soporte General</span>
                    </a>
                     <a
                        href="https://wa.me/593967364089"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block w-full p-3 bg-gray-800/60 rounded-lg border border-transparent hover:border-purple-500/50 hover:bg-gray-800/90 transition-all duration-300"
                    >
                         <span className="text-gray-300 group-hover:text-white font-medium">Manager 2 - Nuevos Ingresos</span>
                    </a>
                </div>
            </div>
        </div>
    </Section>
);


const Footer: React.FC = () => (
    <footer className="border-t border-purple-500/20 text-center py-8 text-gray-500">
        <p>&copy; {new Date().getFullYear()} Agency Moon. Todos los derechos reservados.</p>
    </footer>
);

export default function App() {
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

    return (
        <div className="bg-black text-white min-h-screen overflow-x-hidden">
            <style>{`
                html { scroll-behavior: smooth; scroll-padding-top: 80px; }
                .text-shadow-purple { text-shadow: 0 0 8px rgba(168, 85, 247, 0.7); }
                @keyframes fade-in-down { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }
                .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
                .animation-delay-300 { animation-delay: 0.3s; }

                @keyframes fade-in-down-fast { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-down-fast { animation: fade-in-down-fast 0.3s ease-out forwards; }

                @media (max-width: 767px) {
                    .payment-table thead {
                        display: none;
                    }
                    .payment-table, .payment-table tbody, .payment-table tr, .payment-table td {
                        display: block;
                        width: 100%;
                    }
                    .payment-table tr {
                        margin-bottom: 1rem;
                        border: 1px solid rgba(168, 85, 247, 0.2);
                        border-radius: 0.5rem;
                        padding: 1rem;
                        background: rgba(168, 85, 247, 0.05);
                    }
                    .payment-table td {
                        display: flex;
                        justify-content: space-between;
                        text-align: right;
                        padding-left: 0;
                        padding-right: 0;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        border-bottom: 1px solid rgba(168, 85, 247, 0.1);
                    }
                    .payment-table tr td:last-child {
                        border-bottom: none;
                    }
                    .payment-table td::before {
                        content: attr(data-label);
                        font-weight: 600;
                        text-align: left;
                        margin-right: 1rem;
                        color: #c4b5fd; /* A lighter purple for labels */
                    }
                }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes zoom-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                .animate-zoom-in { animation: zoom-in 0.3s ease-out forwards; }

                .faq-answer p { margin-bottom: 1rem; }
                .faq-answer ul { list-style: none; padding-left: 0.5rem; }
                .faq-answer li { position: relative; padding-left: 1.5rem; margin-bottom: 0.5rem; }
                .faq-answer li::before { content: '✓'; position: absolute; left: 0; color: #a855f7; }
                .faq-answer a { color: #c084fc; text-decoration: underline; }
                .faq-answer a:hover { color: #a855f7; }
                .faq-answer strong { color: #d8b4fe; font-weight: 600; }

                @keyframes move-light {
                    0% { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }

                .talent-card::after {
                    content: '';
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 250%;
                    padding-bottom: 250%;
                    height: 0;
                    background: radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.25), transparent 40%);
                    z-index: 1;
                    pointer-events: none;
                    animation: move-light 15s linear infinite;
                    mix-blend-mode: overlay;
                    opacity: 0.7;
                }
            `}</style>
            <Header onOpenJoinModal={() => setIsJoinModalOpen(true)} />
            <main>
                <Hero onOpenJoinModal={() => setIsJoinModalOpen(true)} />
                <AboutUs />
                <ExperienceSection />
                <Section id="promo-banner" className="py-0 md:py-8">
                    <Banner />
                </Section>
                <FAQ />
                <PaymentsTable />
                <GeneralInfo />
                <TipsSection />
                <TalentsSection />
                <PartnershipSection />
                <Contact />
            </main>
            <JoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
            <Chatbot />
            <Footer />
        </div>
    );
}
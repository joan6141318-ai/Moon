

import React, { useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { FAQItem, PaymentTier, InfoTab } from './types';
import { 
    Logo, ChevronDownIcon, YoutubeIcon, WhatsappIcon, XIcon, ChevronLeftIcon, ChevronRightIcon, MenuIcon,
    PercentageIcon, TransparencyIcon, TrainingIcon, SupportMaterialIcon, TalentDatabaseIcon, VerificationIcon, PersonalizedSupportIcon,
    CheckIcon, StarIcon, TargetIcon, UsersIcon, DollarSignIcon, GlobeIcon, ClockIcon, PuzzleIcon, RocketIcon, BarChartIcon, SettingsIcon,
    InstagramIcon, TiktokIcon
} from './components/icons';
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
const Section: React.FC<{ id: string; children?: ReactNode; className?: string }> = ({ id, children, className = '' }) => {
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

const GlowButton: React.FC<{ children: ReactNode, href?: string, className?: string, onClick?: (e: React.MouseEvent<HTMLElement>) => void, type?: 'button' | 'submit' | 'reset' }> = ({ children, href, className, onClick, type }) => {
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
        <button type={type || 'button'} onClick={handleClick} className={classes}>
            {children}
        </button>
    );
};


// --- Modal Components ---
const AboutUsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const missionVision = [
        { 
            icon: TargetIcon, 
            title: "Misión", 
            description: "Potenciar a los creadores de contenido, brindándoles las mejores oportunidades para que puedan convertir su pasión en una carrera profesional exitosa y sostenible." 
        },
        { 
            icon: StarIcon,
            title: "Visión", 
            description: "Ser la agencia líder a nivel mundial en la representación de talentos de streaming, reconocida por nuestra innovación, transparencia y el éxito de nuestros creadores." 
        }
    ];

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-us-modal-title"
        >
            <div
                className="relative bg-gradient-to-br from-indigo-950 via-black to-black rounded-2xl p-8 md:p-10 border border-purple-500/30 text-white max-w-3xl w-full animate-zoom-in shadow-2xl shadow-purple-500/20"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    aria-label="Cerrar"
                >
                    <XIcon className="w-6 h-6" />
                </button>
                <div className="text-center">
                    <h2 id="about-us-modal-title" className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 mb-4">Quiénes Somos</h2>
                    <p className="text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed text-lg text-center">
                        Con más de 7 años de trayectoria, Agency Moon se ha consolidado como líder en la representación de talentos para el dinámico mundo del streaming. Nos especializamos en descubrir y potenciar a creadores de contenido, conectándolos con las plataformas más influyentes a nivel global. Nuestra comunidad, que supera los 400 talentos activos, es el testimonio de nuestro compromiso con el crecimiento profesional y el éxito sostenible en la industria.
                    </p>
                </div>

                <div className="border-t border-purple-500/20 pt-8 mt-8 grid sm:grid-cols-2 gap-8">
                    {missionVision.map((item, index) => (
                         <div key={index} className="flex flex-col items-center text-center gap-4">
                            <div className="flex-shrink-0 bg-purple-600/20 text-purple-300 rounded-full p-3">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white text-xl mb-1">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const JoinModal: React.FC<{ isOpen: boolean; onClose: () => void; onApplyClick: () => void }> = ({ isOpen, onClose, onApplyClick }) => {
    if (!isOpen) return null;
    
    const requirements = [
        { text: "Edad: 18 a 35 años." },
        { text: "Disponibilidad: Mínimo 2 horas diarias." },
        { text: "Buena conexión a Internet e iluminación." },
        { text: "Personalidad carismática y proactiva." }
    ];

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="join-modal-title"
        >
            <div
                className="relative bg-gradient-to-br from-indigo-950 via-black to-black rounded-2xl p-8 md:p-10 border border-purple-500/30 text-white max-w-lg w-full animate-zoom-in shadow-2xl shadow-purple-500/20"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    aria-label="Cerrar"
                >
                    <XIcon className="w-6 h-6" />
                </button>
                <div className="text-center">
                    <h2 id="join-modal-title" className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 mb-4">¿Listo para brillar?</h2>
                    <p className="text-gray-300 max-w-3xl mx-auto mb-8">Cumple con estos requisitos y da el primer paso para monetizar tu talento.</p>
                </div>
                
                <div className="border-t border-purple-500/20 pt-6">
                     <ul className="space-y-4">
                        {requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-4">
                                <div className="flex-shrink-0 bg-purple-600/20 text-purple-300 rounded-full p-2">
                                    <CheckIcon className="w-5 h-5" />
                                </div>
                                <span className="text-gray-300 mt-1">{req.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="text-center mt-8 pt-6 border-t border-purple-500/20">
                    <GlowButton onClick={() => { onClose(); onApplyClick(); }}>Quiero postularme</GlowButton>
                </div>
            </div>
        </div>
    );
};

const ApplicationFormModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        country: '',
        availability: '',
        contact: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsSubmitted(false);
            setFormData({
                name: '',
                age: '',
                country: '',
                availability: '',
                contact: '',
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const message = `Me gustaría unirme a su equipo de creadores.\n\n*Nombre:* ${formData.name}\n*Edad:* ${formData.age}\n*País:* ${formData.country}\n*Disponibilidad de horas:* ${formData.availability}\n*Contacto:* ${formData.contact}`;
        const encodedMessage = encodeURIComponent(message);
        
        const managerUrl = `https://wa.me/528118807625?text=${encodedMessage}`;
        
        window.open(managerUrl, '_blank');
        setIsSubmitted(true);
    };

    const formFields = [
        { name: 'name', label: 'Nombre:', type: 'text', placeholder: 'Tu nombre completo' },
        { name: 'age', label: 'Edad:', type: 'number', placeholder: 'Ej: 25' },
        { name: 'country', label: 'País:', type: 'text', placeholder: 'Desde dónde nos escribes' },
        { name: 'availability', label: 'Disponibilidad de horas en el día:', type: 'text', placeholder: 'Ej: 3-4 horas por la tarde' },
        { name: 'contact', label: 'Contacto:', type: 'text', placeholder: 'Tu número de WhatsApp o red social' },
    ];

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-form-title"
        >
            <div
                className="relative bg-gradient-to-br from-indigo-950 via-black to-black rounded-2xl p-8 md:p-10 border border-purple-500/30 text-white max-w-lg w-full animate-zoom-in shadow-2xl shadow-purple-500/20"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    aria-label="Cerrar"
                >
                    <XIcon className="w-6 h-6" />
                </button>
                
                {isSubmitted ? (
                    <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-600/20 to-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
                            <CheckIcon className="w-10 h-10 text-green-400" />
                        </div>
                        <h2 id="application-form-title" className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-green-400 mb-4">¡Postulación Recibida!</h2>
                        <p className="text-gray-300 max-w-md mx-auto mb-8">
                            Gracias por tu interés en unirte a Agency Moon. Tu postulación ha sido enviada con éxito.
                        </p>
                        <GlowButton onClick={() => onClose()}>Finalizar</GlowButton>
                    </div>
                ) : (
                    <>
                        <div className="text-center">
                            <h2 id="application-form-title" className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 mb-4">Me gustaría unirme a su equipo de creadores</h2>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                            {formFields.map(field => (
                                <div key={field.name}>
                                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-300 mb-2">{field.label}</label>
                                    <input
                                        type={field.type}
                                        id={field.name}
                                        name={field.name}
                                        value={formData[field.name as keyof typeof formData]}
                                        onChange={handleChange}
                                        placeholder={field.placeholder}
                                        required
                                        className="w-full bg-gray-900/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                                    />
                                </div>
                            ))}

                            <div className="text-center pt-6">
                                <GlowButton type="submit" className="w-full">Enviar el mensaje</GlowButton>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

const PartnershipModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: "ÚNETE A NUESTRO EQUIPO COMO SUB AGENCIA",
            description: "Forma parte del mundo del streaming y crece junto a un equipo transparente y comprometido con tu desarrollo.",
            subDescription: "Aquí valoramos la confianza, la comunicación clara y el trabajo en conjunto.",
            offerTitle: "Ofrecemos:",
            benefits: [
                { icon: PercentageIcon, text: "Los porcentajes de ganancia más altos del mercado." },
                { icon: TransparencyIcon, text: "Transparencia total en reportes, pagos y procesos." },
                { icon: TrainingIcon, text: "Capacitación constante para ti y tu equipo." },
                { icon: SupportMaterialIcon, text: "Material de apoyo profesional y actualizado." },
                { icon: TalentDatabaseIcon, text: "Acceso a base de datos de talentos y herramientas exclusivas." },
                { icon: VerificationIcon, text: "Verificación oficial como agente activo." },
                { icon: PersonalizedSupportIcon, text: "Acompañamiento personalizado para que logres tus metas." }
            ],
            footerText: "Comunícate con nosotros para saber los requisitos"
        },
        {
            title: "ÚNETE A NUESTRO EQUIPO COMO RECLUTADOR",
            description: "Forma parte del mundo del streaming y crece junto a un equipo transparente, confiable y comprometido con tu desarrollo.",
            subDescription: "En nuestro equipo valoramos la confianza, la comunicación clara y el trabajo en conjunto.",
            offerTitle: "Ofrecemos:",
            benefits: [
                { icon: DollarSignIcon, text: "La mejor remuneración del mercado, 100% comprobada." },
                { icon: VerificationIcon, text: "Verificación oficial como miembro del equipo." },
                { icon: SettingsIcon, text: "Acceso a herramientas exclusivas para tu gestión." },
                { icon: BarChartIcon, text: "Reporte semanal de resultados y avances." },
                { icon: RocketIcon, text: "Posibilidad de crecimiento dentro del equipo." },
                { icon: SupportMaterialIcon, text: "Material de apoyo y capacitaciones constantes." },
                { icon: UsersIcon, text: "Acceso a grupos de trabajo y red de colaboradores." },
                { icon: DollarSignIcon, text: "Remuneración competitiva por desempeño." },
            ],
            footerText: "Da el siguiente paso y sé parte de una red que impulsa el crecimiento en el mundo del streaming."
        }
    ];

    if (!isOpen) return null;

    const next = () => setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    const prev = () => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="relative w-full max-w-3xl flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={prev}
                    aria-label="Anterior"
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 rounded-full hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>

                <div
                    className="relative bg-gradient-to-br from-indigo-950 via-black to-black rounded-2xl border border-purple-500/30 text-white max-w-2xl w-full animate-zoom-in shadow-2xl shadow-purple-500/20"
                >
                    <div className="overflow-hidden relative">
                        <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                            {slides.map((slide, i) => (
                                <div key={i} className="p-6 md:p-8 pb-12 min-w-full">
                                    <div className="text-center">
                                        <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 mb-4">{slide.title}</h2>
                                        <p className="text-gray-300 text-sm mb-3">{slide.description}</p>
                                        <p className="text-gray-400 mb-6 text-xs">{slide.subDescription}</p>
                                    </div>

                                    <div className="border-t border-purple-500/20 pt-5">
                                        <h3 className="text-md font-semibold text-white mb-4 text-center">{slide.offerTitle}</h3>
                                        <ul className="space-y-4">
                                            {slide.benefits.map((benefit, index) => (
                                                <li key={index} className="flex items-center gap-4">
                                                    <div className="flex-shrink-0 bg-purple-600/20 text-purple-300 rounded-full p-2">
                                                        <benefit.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-gray-300 text-sm leading-relaxed">{benefit.text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <p className="text-center text-purple-300 font-medium mt-6 pt-5 border-t border-purple-500/20 text-xs">
                                        {slide.footerText}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="absolute bottom-4 left-0 right-0">
                        <div className="flex items-center justify-center gap-2">
                            {slides.map((_, i) => (
                                <div key={i} onClick={() => setCurrentSlide(i)} className={`transition-all w-2 h-2 bg-white rounded-full cursor-pointer ${currentSlide === i ? "p-1.5 bg-purple-500" : "bg-opacity-50"}`} />
                            ))}
                        </div>
                    </div>
                    
                     <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors" aria-label="Cerrar">
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                <button
                    onClick={next}
                    aria-label="Siguiente"
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 rounded-full hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                    <ChevronRightIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};


// --- Page Section Components ---

const Header: React.FC<{ onOpenJoinModal: () => void; onOpenAboutModal: () => void; activeSection: string; }> = ({ onOpenJoinModal, onOpenAboutModal, activeSection }) => {
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
        } else if (href === '#about-us-anchor') {
             e.preventDefault();
            onOpenAboutModal();
        } else {
            handleSmoothScroll(e);
        }
    };
    
    const navLinks = [
        { name: 'Quiénes somos', href: '#about-us-anchor' },
        { name: 'Experiencia', href: '#experience' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Información', href: '#info' },
        { name: 'Tips', href: '#tips' },
        { name: 'Talentos', href: '#talents'},
        { name: 'Testimonios', href: '#testimonials'},
        { name: 'Socios', href: '#partnership' },
        { name: 'Contacto', href: '#contact' },
    ];

    const mobileNavLinks = [
        { name: 'Quiénes Somos', href: '#about-us-anchor' },
        { name: 'Nuestra Experiencia', href: '#experience' },
        { name: 'Requisitos para Unirte', href: '#join-modal' },
        { name: 'Preguntas Frecuentes', href: '#faq' },
        { name: 'Información General', href: '#info' },
        { name: 'Tips de Transmisión', href: '#tips' },
        { name: 'Nuestros Talentos', href: '#talents' },
        { name: 'Testimonios', href: '#testimonials'},
        { name: 'Sé Nuestro Socio', href: '#partnership' },
        { name: 'Contáctanos', href: '#contact' },
    ];
    
    // Map href '#about-us-anchor' to active section 'about-us'
    const getIsActive = (href: string) => {
        const linkId = href.substring(1);
        if (linkId === 'about-us-anchor') {
            return activeSection === 'about-us';
        }
        return activeSection === linkId;
    }


    return (
        <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'}`}>
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#home" onClick={handleSmoothScroll} className="flex items-center gap-2">
                    <Logo className="h-8 w-auto text-white" />
                    <span className="text-white font-bold text-xl">Agency Moon</span>
                </a>
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => {
                        const isActive = getIsActive(link.href);
                        return (
                             <a 
                                key={link.name} 
                                href={link.href} 
                                onClick={(e) => handleMenuClick(e, link.href)} 
                                className={`transition-colors font-medium ${isActive ? 'text-purple-400 font-bold text-shadow-purple' : 'text-gray-300 hover:text-white hover:text-shadow-purple'}`}
                             >
                                {link.name}
                            </a>
                        );
                    })}
                </div>
                 <GlowButton onClick={() => onOpenJoinModal()} className="hidden md:inline-block">Únete ahora</GlowButton>
                 <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none" aria-label="Abrir menú">
                        {isMenuOpen ? <XIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
                    </button>
                </div>
            </nav>
            {isMenuOpen && (
                 <div className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-sm animate-fade-in-down-fast">
                    <div className="flex flex-col items-start px-6 py-4 space-y-1">
                        {mobileNavLinks.map(link => {
                             const isActive = getIsActive(link.href);
                             return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`w-full text-left py-3 px-3 rounded-md transition-colors text-lg ${isActive ? 'bg-purple-600/30 text-white font-semibold' : 'text-gray-200 hover:bg-purple-600/30 hover:text-white'}`}
                                    onClick={(e) => handleMenuClick(e, link.href)}
                                >
                                    {link.name}
                                </a>
                            );
                        })}
                    </div>
                 </div>
            )}
        </header>
    );
};

const Hero: React.FC<{ onOpenJoinModal: () => void }> = ({ onOpenJoinModal }) => (
    <section id="home" className="h-screen min-h-[700px] w-full flex items-center justify-center relative text-white text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black z-0">
            <img
                src="https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Fondo de galaxia púrpura y azul"
                className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-down" style={{textShadow: '0 0 15px rgba(168, 85, 247, 0.7)'}}>Haz brillar tu talento</h1>
            <p className="text-xl md:text-2xl max-w-3xl my-6 text-gray-300 italic animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                "Que no te digan que el cielo es el límite cuando hay huellas en la luna"
            </p>
            <p className="text-lg md:text-xl max-w-3xl mb-8 text-gray-300 animate-fade-in-up" style={{ animationDelay: '300ms' }}>Únete a nuestra comunidad de creadores y empieza a monetizar tus transmisiones.</p>
            <div className="animate-fade-in-up" style={{ animationDelay: '450ms' }}>
                <GlowButton onClick={() => onOpenJoinModal()}>Únete ahora</GlowButton>
            </div>
        </div>
    </section>
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
            answer: 'Tus ganancias dependen directamente de tu desempeño y del cumplimiento de las metas de semillas. Puedes consultar nuestra <a href="#info" id="faq-payment-link">Tabla de Pagos</a> para ver el potencial de ingresos. ¡El cielo es el límite!'
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
        }
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

const paymentData: PaymentTier[] = [
    { level: 'A', seedsGoal: '2,000', dailyHours: '2', remuneration: '$14', seedExchange: '$9', totalPayment: '$23' },
    { level: 'B', seedsGoal: '5,000', dailyHours: '2', remuneration: '$35', seedExchange: '$23', totalPayment: '$58' },
    { level: 'C', seedsGoal: '10,000', dailyHours: '2', remuneration: '$74', seedExchange: '$48', totalPayment: '$122' },
    { level: 'CE', seedsGoal: '20,000', dailyHours: '2', remuneration: '$141', seedExchange: '$95', totalPayment: '$236' },
    { level: 'D', seedsGoal: '30,000', dailyHours: '2', remuneration: '$211', seedExchange: '$143', totalPayment: '$354' },
    { level: 'E', seedsGoal: '60,000', dailyHours: '2', remuneration: '$422', seedExchange: '$286', totalPayment: '$708' },
    { level: 'S1', seedsGoal: '100,000', dailyHours: '2', remuneration: '$660', seedExchange: '$476', totalPayment: '$1,136' },
    { level: 'S2', seedsGoal: '150,000', dailyHours: '2', remuneration: '$990', seedExchange: '$714', totalPayment: '$1,704' },
    { level: 'S3', seedsGoal: '200,000', dailyHours: '2', remuneration: '$1,320', seedExchange: '$952', totalPayment: '$2,272' },
    { level: 'S4', seedsGoal: '250,000', dailyHours: '2', remuneration: '$1,650', seedExchange: '$1,190', totalPayment: '$2,840' },
    { level: 'S5', seedsGoal: '300,000', dailyHours: '2', remuneration: '$1,980', seedExchange: '$1,429', totalPayment: '$3,409' },
    { level: 'S6', seedsGoal: '400,000', dailyHours: '2', remuneration: '$2,700', seedExchange: '$1,905', totalPayment: '$4,604' },
    { level: 'S7', seedsGoal: '500,000', dailyHours: '2', remuneration: '$3,550', seedExchange: '$2,381', totalPayment: '$5,931' },
    { level: 'S8', seedsGoal: '750,000', dailyHours: '2', remuneration: '$5,500', seedExchange: '$3,572', totalPayment: '$9,072' },
    { level: 'S9', seedsGoal: '1,000,000', dailyHours: '2', remuneration: '$6,800', seedExchange: '$4,762', totalPayment: '$11,562' },
    { level: 'S10', seedsGoal: '1,500,000', dailyHours: '2', remuneration: '$10,400', seedExchange: '$7,143', totalPayment: '$17,543' },
    { level: 'S11', seedsGoal: '2,000,000', dailyHours: '2', remuneration: '$14,500', seedExchange: '$9,524', totalPayment: '$24,024' },
    { level: 'S12', seedsGoal: '3,000,000', dailyHours: '2', remuneration: '$22,500', seedExchange: '$14,286', totalPayment: '$36,786' }
];

const PaymentInfoCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevTier = () => {
        const isFirst = currentIndex === 0;
        const newIndex = isFirst ? paymentData.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextTier = () => {
        const isLast = currentIndex === paymentData.length - 1;
        const newIndex = isLast ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    
    const currentTier = paymentData[currentIndex];

    return (
        <div className="relative">
            <div className="block border border-purple-500/30 rounded-lg overflow-hidden transition-all duration-300 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.7)]">
                <img src="https://i.postimg.cc/8zccpBdH/NIVEL-20251030-155750-0001.png" alt="Tabla de Pagos" className="w-full h-auto" />
            </div>

            <div className="bg-gray-800/50 p-4 rounded-lg relative overflow-hidden mt-4 border border-purple-500/20">
                <button onClick={prevTier} aria-label="Nivel anterior" className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1 bg-black/40 rounded-full hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400">
                    <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button onClick={nextTier} aria-label="Siguiente nivel" className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1 bg-black/40 rounded-full hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400">
                    <ChevronRightIcon className="w-5 h-5" />
                </button>

                <div key={currentIndex} className="text-center animate-fade-in">
                    <h4 className="text-2xl font-bold text-purple-400 mb-4">Nivel {currentTier.level}</h4>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm max-w-xs mx-auto">
                        <p className="text-left text-gray-400">Meta Semillas:</p>
                        <p className="text-right font-semibold text-white">{currentTier.seedsGoal}</p>
                        
                        <p className="text-left text-gray-400">Horas Diarias:</p>
                        <p className="text-right font-semibold text-white">{currentTier.dailyHours}</p>
                        
                        <p className="text-left text-gray-400">Remuneración:</p>
                        <p className="text-right font-semibold text-white">{currentTier.remuneration}</p>
                        
                        <p className="text-left text-gray-400">Cambio Semillas:</p>
                        <p className="text-right font-semibold text-white">{currentTier.seedExchange}</p>
                        
                        <hr className="col-span-2 border-purple-500/30 my-1"/>
                        
                        <p className="text-left text-purple-300 font-bold text-base">Pago Total:</p>
                        <p className="text-right font-bold text-lg text-purple-300">{currentTier.totalPayment} USD</p>
                    </div>
                </div>
            </div>
             
            <div className="flex justify-center gap-2 mt-4">
                {paymentData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex ? 'bg-purple-500 scale-125' : 'bg-gray-600 hover:bg-gray-400'}`}
                        aria-label={`Ir al nivel ${paymentData[index].level}`}
                    />
                ))}
            </div>
        </div>
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
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
            <div className="text-gray-300 px-6 pb-6 space-y-4">
                {item.content}
            </div>
        </div>
    </div>
);

const GeneralInfo: React.FC<{ openIndex: number | null; onToggle: (index: number) => void }> = ({ openIndex, onToggle }) => {

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
                            className="inline-flex items-center gap-3 bg-gradient-to-br from-
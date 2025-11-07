import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 155 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="70" r="25"/>
        <rect width="45" height="90" rx="22.5" transform="translate(50 10) rotate(-30 22.5 45)"/>
        <rect width="45" height="90" rx="22.5" transform="translate(95 10) rotate(-30 22.5 45)"/>
    </svg>
);

export const ChatbotIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#7C3AED"/>
        <path d="M22.9,10.9h-1.1v-1c0-0.9-0.7-1.6-1.6-1.6h-8.2c-0.9,0-1.6,0.7-1.6,1.6v1H9.1c-0.9,0-1.6,0.7-1.6,1.6v5.8 c0,0.9,0.7,1.6,1.6,1.6h1.1v2.1c0,0.4,0.3,0.8,0.8,0.8c0.2,0,0.3-0.1,0.5-0.2l2.6-2.6h7.8c0.9,0,1.6-0.7,1.6-1.6v-5.8 C24.5,11.6,23.8,10.9,22.9,10.9z M13.1,15.8c-0.6,0-1.1-0.5-1.1-1.1s0.5-1.1,1.1-1.1s1.1,0.5,1.1,1.1S13.7,15.8,13.1,15.8z M18.9,15.8c-0.6,0-1.1-0.5-1.1-1.1s0.5-1.1,1.1-1.1c0.6,0,1.1,0.5,1.1,1.1S19.5,15.8,18.9,15.8z" fill="#FFFFFF"/>
        <circle cx="16" cy="6.6" r="1.3" fill="#FFFFFF"/>
    </svg>
);


export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export const XIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

export const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

export const MicIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
  </svg>
);

export const MicOffIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="1" y1="1" x2="23" y2="23"></line>
    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
  </svg>
);

export const YoutubeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        viewBox="0 0 28 20" 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
        aria-hidden="true"
    >
        <defs>
            <linearGradient id="youtube-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
        </defs>
        <path 
            fill="url(#youtube-gradient)"
            d="M27.313 3.133C26.977 1.895 25.996.915 24.758.58C22.593 0 14 0 14 0S5.407 0 3.242.58C1.994.915 1.023 1.895.687 3.133C0 5.358 0 10 0 10s0 4.642.687 6.867c.336 1.238 1.317 2.218 2.555 2.555C5.407 19.999 14 19.999 14 19.999s8.593 0 10.758-.579c1.238-.337 2.219-1.317 2.555-2.555C28 14.642 28 10 28 10s0-4.642-.687-6.867z"
        />
        <path fill="#FFFFFF" d="M11.2 14.266V5.734L18.4 10l-7.2 4.266z" />
    </svg>
);

export const WhatsappIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
    >
        {/* Solid Purple Background, matching the image */}
        <rect width="16" height="16" rx="3.5" fill="#7C3AED"/>
        
        {/* White WhatsApp Icon Path, with a little padding */}
        <g transform="translate(1.5, 1.5) scale(0.8125)">
            <path
                fill="white"
                d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
            />
        </g>
    </svg>
);

export const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);
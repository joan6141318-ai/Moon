// FIX: All React hooks were undefined because the import statement was malformed. This has been corrected.
import React, { useState, useRef, useEffect } from 'react';
import { type Chat } from '@google/genai';
import { type ChatMessage } from '../types';
import { startChat } from '../services/gemini';
import { XIcon, SendIcon, ChatbotIcon } from './icons';

const lunaAvatarUrl = 'https://i.postimg.cc/1fn8L8N1/IMG-20251107-163305.png';

// Componente para formatear y renderizar el contenido de los mensajes del chatbot
const ChatMessageContent: React.FC<{ content: string; onViewImage: (url: string) => void }> = ({ content, onViewImage }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async (url: string, filename: string) => {
        setIsDownloading(true);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`La respuesta de la red no fue correcta: ${response.statusText}`);
            }
            const blob = await response.blob();
            const objectUrl = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            window.URL.revokeObjectURL(objectUrl);
        } catch (error) {
            console.error('Error al descargar la imagen:', error);
            alert('No se pudo descargar la imagen. Por favor, intenta de nuevo.');
        } finally {
            setIsDownloading(false);
        }
    };

    // Handle special payment table format
    if (content.includes('[PAYMENT_TABLE_IMAGE]')) {
        const parts = content.split('[PAYMENT_TABLE_IMAGE]');
        const introText = parts[0].trim();
        const urls = parts[1]?.split('|') || [];
        const imageUrl = urls[0];

        if (!imageUrl) {
            return <p className="text-sm leading-relaxed text-left">{content.replace(/\[PAYMENT_TABLE_IMAGE\].*/, '')}</p>;
        }

        return (
            <div className="text-sm">
                {introText && <p className="leading-relaxed mb-2 text-left">{introText}</p>}
                <img src={imageUrl} alt="Tabla de Pagos" className="w-full h-auto rounded-lg border border-purple-500/30 mt-2" />
                <div className="flex items-center justify-center gap-2 mt-3">
                    <button
                        onClick={() => onViewImage(imageUrl)}
                        className="flex-1 text-center bg-purple-600 text-white font-semibold py-2 px-4 rounded-md text-xs transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        Ver
                    </button>
                    <button
                        onClick={() => handleDownload(imageUrl, 'tabla-de-pagos-agency-moon.png')}
                        disabled={isDownloading}
                        className="flex-1 text-center bg-gray-600 text-white font-semibold py-2 px-4 rounded-md text-xs transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {isDownloading ? 'Descargando...' : 'Descargar'}
                    </button>
                </div>
            </div>
        );
    }

    const blocks = content.split(/\n\s*\n/).map(block => block.trim()).filter(Boolean);

    return (
        <div className="text-sm space-y-3">
            {blocks.map((block, blockIndex) => {
                const lines = block.split('\n').map(line => line.trim());
                
                // Renders headings like **Title**
                if (lines.length === 1 && lines[0].startsWith('**') && lines[0].endsWith('**')) {
                    return (
                        <p key={blockIndex} className="font-bold text-purple-300 text-base pt-1 text-left">
                            {lines[0].slice(2, -2)}
                        </p>
                    );
                }

                // Renders list items that start with "- "
                if (lines.every(line => line.startsWith('- '))) {
                    return (
                        <ul key={blockIndex} className="space-y-2">
                            {lines.map((line, lineIndex) => {
                                const itemContent = line.substring(2);
                                const [key, ...valueParts] = itemContent.split(':');
                                const value = valueParts.join(':');

                                return (
                                    <li key={lineIndex} className="flex items-start text-left">
                                        <span className="text-purple-400 mr-2 mt-1 flex-shrink-0">•</span>
                                        <span className="leading-relaxed">
                                            {value.trim() && valueParts.length > 0 ? (
                                                <>
                                                    <strong className="font-semibold text-purple-300">{key.replace(/\*/g, '').trim()}:</strong>
                                                    {' '}{value.trim()}
                                                </>
                                            ) : (
                                                itemContent.replace(/\*/g, '')
                                            )}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    );
                }

                // Renders normal paragraphs, stripping any leftover '*'
                return (
                    <p key={blockIndex} className="leading-relaxed text-left">
                        {block.replace(/\*/g, '')}
                    </p>
                );
            })}
        </div>
    );
};


export const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', content: 'Hola, mi nombre es Luna, soy asistente oficial de Agencia MOON. Será un gusto poder atender tus dudas. ¿Me podrías brindar tu nombre, por favor?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalImage, setModalImage] = useState<string | null>(null);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isOpen && !chatRef.current) {
            chatRef.current = startChat();
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            if (chatRef.current) {
                const result = await chatRef.current.sendMessage({ message: input });
                const modelMessage: ChatMessage = { role: 'model', content: result.text };
                setMessages(prev => [...prev, modelMessage]);
            } else {
                 throw new Error("Chat not initialized");
            }
        } catch (error) {
            console.error('Error sending message:', error);
            let errorText = 'Lo siento, ocurrió un error. Por favor, intenta de nuevo.';
            if (error instanceof Error && (error.message.includes('RESOURCE_EXHAUSTED') || error.message.includes('API key not valid'))) {
                errorText = 'Hubo un problema de conexión con el asistente. Por favor, inténtalo de nuevo más tarde.';
            }
            const errorMessage: ChatMessage = { role: 'model', content: errorText };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transform hover:scale-105"
                    aria-label={isOpen ? "Cerrar chatbot de texto" : "Abrir chatbot de texto"}
                >
                    {isOpen ? (
                        <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 hover:shadow-xl hover:shadow-purple-500/50">
                            <XIcon className="w-8 h-8" />
                        </div>
                    ) : (
                        <ChatbotIcon className="w-16 h-16 shadow-lg hover:shadow-xl hover:shadow-purple-500/50 rounded-full" />
                    )}
                </button>
            </div>
            
            {isOpen && (
                <>
                    <div className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[600px] bg-gray-900/80 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-2xl flex flex-col z-50 transition-all duration-300 origin-bottom-right animate-fade-in-up">
                        <header className="flex items-center justify-between p-4 border-b border-purple-500/30">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img src={lunaAvatarUrl} alt="Avatar de Luna" className="w-10 h-10 rounded-full object-cover border-2 border-purple-500/50" />
                                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-gray-900/80 border border-gray-900/80"></span>
                                </div>
                                <h3 className="text-white font-semibold text-lg">Asistente Luna</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                                <XIcon className="w-5 h-5" />
                            </button>
                        </header>

                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {messages.map((msg, index) => (
                               msg.role === 'user' ? (
                                    <div key={index} className="flex justify-end animate-message-in">
                                        <div className="max-w-[80%] p-3 rounded-xl bg-purple-600 text-white rounded-br-none">
                                            <p className="text-sm">{msg.content}</p>
                                        </div>
                                    </div>
                               ) : (
                                    <div key={index} className="flex items-start space-x-3 animate-message-in">
                                        <img src={lunaAvatarUrl} alt="Avatar de Luna" className="w-8 h-8 rounded-full object-cover shadow-lg flex-shrink-0" />
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-purple-300 mb-1">Asistente Luna</p>
                                            <div className="w-fit max-w-full p-3 rounded-xl bg-gray-700 text-gray-200 rounded-bl-none">
                                                <ChatMessageContent content={msg.content} onViewImage={setModalImage} />
                                            </div>
                                        </div>
                                    </div>
                               )
                            ))}
                            {isLoading && (
                                <div className="flex items-start space-x-3 animate-message-in">
                                    <img src={lunaAvatarUrl} alt="Avatar de Luna" className="w-8 h-8 rounded-full object-cover shadow-lg flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-purple-300 mb-1">Asistente Luna está escribiendo...</p>
                                        <div className="bg-gray-700 text-gray-200 p-3 rounded-xl rounded-bl-none inline-block">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                             <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSendMessage} className="p-4 border-t border-purple-500/30">
                            <div className="flex items-center bg-gray-800 rounded-full p-1 focus-within:ring-2 focus-within:ring-purple-500 transition-all">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Escribe tu pregunta..."
                                    className="flex-1 min-w-0 bg-transparent text-white px-4 py-2 focus:outline-none placeholder-gray-500"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-2 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-purple-500/40 focus:outline-none disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
                                    disabled={isLoading || !input.trim()}
                                    aria-label="Enviar mensaje"
                                >
                                    <SendIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    {modalImage && (
                        <div
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in"
                            onClick={() => setModalImage(null)}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Vista previa de imagen"
                        >
                            <div
                                className="relative max-w-4xl max-h-[90vh] animate-zoom-in"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img src={modalImage} alt="Vista previa de la tabla de pagos" className="w-auto h-auto max-w-full max-h-[90vh] rounded-lg shadow-2xl shadow-purple-500/30" />
                                <button
                                    onClick={() => setModalImage(null)}
                                    className="absolute -top-3 -right-3 text-white bg-purple-600 rounded-full p-2 hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    aria-label="Cerrar vista previa"
                                >
                                    <XIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    )}

                    <style>{`
                        @keyframes fade-in-up {
                            from { opacity: 0; transform: translateY(20px) scale(0.95); }
                            to { opacity: 1; transform: translateY(0) scale(1); }
                        }
                        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }

                        @keyframes message-in {
                            from { opacity: 0; transform: translateY(10px) scale(0.98); }
                            to { opacity: 1; transform: translateY(0) scale(1); }
                        }
                        .animate-message-in { animation: message-in 0.4s ease-out forwards; }
                    `}</style>
                </>
            )}
        </>
    );
};
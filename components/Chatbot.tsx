

import React, { useState, useRef, useEffect } from 'react';
import { type Chat } from '@google/genai';
import { type ChatMessage } from '../types';
import { startChat } from '../services/gemini';
import { ChatbotIcon, XIcon, SendIcon } from './icons';

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
        const linkUrl = urls[1];

        if (!imageUrl || !linkUrl) {
            return <p className="text-sm leading-relaxed">{content.replace(/\[PAYMENT_TABLE_IMAGE\].*/, '')}</p>;
        }

        return (
            <div className="text-sm">
                {introText && <p className="leading-relaxed mb-2">{introText}</p>}
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

    const lines = content.split('\n').map(line => line.trim()).filter(line => line);

    return (
        <div className="text-sm space-y-2">
            {lines.map((line, index) => {
                // Renders headings like **Title**
                if (line.startsWith('**') && line.endsWith('**')) {
                    return (
                        <p key={index} className="font-bold text-purple-300 text-base pt-2">
                            {line.slice(2, -2)}
                        </p>
                    );
                }

                // Renders list items like "- **Key:** Value" or "- Item"
                if (line.startsWith('- ')) {
                    const itemContent = line.substring(2);
                    const [key, ...valueParts] = itemContent.split(':');
                    const value = valueParts.join(':');

                    return (
                        <div key={index} className="flex items-start pl-2">
                            <span className="text-purple-400 mr-2 mt-1.5 flex-shrink-0">•</span>
                            {value.trim() && valueParts.length > 0 ? (
                                <span className="leading-relaxed">
                                    <strong className="font-semibold text-purple-300">{key.replace(/\*/g, '').trim()}:</strong>
                                    {' '}{value.trim()}
                                </span>
                            ) : (
                                <span className="leading-relaxed">{itemContent.replace(/\*/g, '')}</span>
                            )}
                        </div>
                    );
                }
                
                 // Handles non-list key-value pairs
                const [key, ...valueParts] = line.split(':');
                const value = valueParts.join(':');
                if (value.trim() && valueParts.length > 0 && key.length < 40) {
                    return (
                        <p key={index} className="leading-relaxed">
                            <strong className="font-semibold text-purple-300">{key.replace(/\*/g, '').trim()}:</strong>
                            {' '}{value.trim()}
                        </p>
                    )
                }

                // Renders normal paragraphs, stripping any leftover '*'
                return <p key={index} className="leading-relaxed">{line.replace(/\*/g, '')}</p>;
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
        if (isOpen) {
            chatRef.current = startChat();
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

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
            }
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: ChatMessage = { role: 'model', content: 'Lo siento, ocurrió un error. Por favor, intenta de nuevo.' };
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
                    aria-label="Toggle chatbot"
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
                <div className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[600px] bg-gray-900/80 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-2xl flex flex-col z-50 transition-all duration-300 origin-bottom-right animate-fade-in-up">
                    <header className="flex items-center justify-between p-4 border-b border-purple-500/30">
                        <h3 className="text-white font-semibold text-lg">Asistente Luna</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                            <XIcon className="w-5 h-5" />
                        </button>
                    </header>

                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-message-in`}>
                                <div className={`max-w-[80%] p-3 rounded-xl ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
                                    {msg.role === 'model' ? <ChatMessageContent content={msg.content} onViewImage={setModalImage} /> : <p className="text-sm">{msg.content}</p>}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start animate-message-in">
                                <div className="bg-gray-700 text-gray-200 p-3 rounded-xl rounded-bl-none">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
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
            )}
            
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
    );
};
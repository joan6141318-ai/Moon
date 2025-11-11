import React, { useState } from 'react';
import { Message } from './types';
import { getGeminiResponse } from './services/gemini';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: '¡Hola! ¿En qué puedo ayudarte hoy?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const botResponseText = await getGeminiResponse(text);
      const botMessage: Message = { role: 'model', text: botResponseText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        role: 'model',
        text: 'Lo siento, ocurrió un error. Por favor intenta de nuevo.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Chatbot
      messages={messages}
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
    />
  );
};

export default App;
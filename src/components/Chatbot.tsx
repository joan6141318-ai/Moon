import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { SendIcon } from './icons';

interface ChatbotProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({
  messages,
  onSendMessage,
  isLoading,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.messageList}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.messageBubble,
              ...(msg.role === 'user' ? styles.userBubble : styles.modelBubble),
            }}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div style={{ ...styles.messageBubble, ...styles.modelBubble }}>
            ...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} style={styles.inputForm}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe un mensaje..."
          style={styles.input}
          disabled={isLoading}
          aria-label="Escribe un mensaje"
        />
        <button type="submit" style={styles.sendButton} disabled={isLoading} aria-label="Enviar mensaje">
          <SendIcon style={styles.sendIcon} />
        </button>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
  },
  messageList: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: '10px 15px',
    borderRadius: '20px',
    lineHeight: '1.4',
    wordWrap: 'break-word',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: 'var(--user-bg)',
    color: 'var(--text-light)',
    borderBottomRightRadius: '5px',
  },
  modelBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'var(--model-bg)',
    color: 'var(--text-dark)',
    borderBottomLeftRadius: '5px',
  },
  inputForm: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-light)',
  },
  input: {
    flex: 1,
    padding: '10px 15px',
    border: '1px solid var(--border-color)',
    borderRadius: '20px',
    fontSize: '16px',
    marginRight: '10px',
  },
  sendButton: {
    background: 'var(--user-bg)',
    border: 'none',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'white',
  },
  sendIcon: {
    width: '24px',
    height: '24px',
  },
};

export default Chatbot;

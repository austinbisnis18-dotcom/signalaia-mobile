import { useState, useCallback } from 'react';
import { Message } from '../../App';

const INITIAL_MESSAGES: Message[] = [
  { id: '1', role: 'assistant', content: 'Yo bro, gue Signal AI - dating coach lo. Mau bedah chat, baca sinyal cewek, atau cari strategi? Drop aja di sini.' },
  { id: '2', role: 'user', content: 'Dia nge-ghosting setelah jalan bareng' },
  { id: '3', role: 'assistant', content: 'Oof, ghosting setelah jalan? Bisa jadi dia lagi testing atau emang ga tertarik. Coba ceritain detailnya.' },
];

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);

  const sendMessage = useCallback((content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
    };
    setMessages(prev => [...prev, newMessage]);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Got your message: "${content}". I'm thinking...`,
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 800);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    sendMessage,
    clearMessages,
  };
};

export default useChat;
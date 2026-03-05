import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

/**
 * Componente ChatWindow.
 * Muestra la lista de mensajes y hace scroll automático al final.
 */
const ChatWindow = ({ messages }) => {
    const scrollRef = useRef(null);

    // Auto-scroll al final cuando hay nuevos mensajes
    // Regla frontend 35
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div
            className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 scroll-smooth"
            ref={scrollRef}
        >
            {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-400 text-sm italic">
                    No hay mensajes aún. Comienza la conversación.
                </div>
            ) : (
                messages.map((msg, index) => (
                    <MessageBubble key={index} message={msg} />
                ))
            )}
        </div>
    );
};

export default ChatWindow;

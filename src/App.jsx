import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';

/**
 * Componente principal App.
 * Maneja el estado global de la conversación y la comunicación con la API.
 */
const App = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = { role: 'user', content: input };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setInput('');
        setLoading(true);
        setError(null);

        try {
            // Llamada al endpoint local /api/chat
            // Regla frontend 15 y 34 (envía el historial completo)
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: newMessages }),
            });

            // Manejo de errores de red o servidor
            if (!response.ok) {
                throw new Error('No se pudo conectar con el asistente.');
            }

            // Procesamiento seguro de JSON (según la regla 41, aunque implementado directamente aquí por simplicidad)
            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const assistantMessage = { role: 'assistant', content: data.result };
            setMessages((prev) => [...prev, assistantMessage]);

        } catch (err) {
            console.error('Frontend error:', err);
            setError(err.message || 'Ocurrió un error inesperado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen max-w-2xl mx-auto border-x border-gray-200 shadow-xl bg-white">
            {/* Header */}
            <header className="bg-blue-600 text-white p-4 shadow-md">
                <h1 className="text-xl font-bold">Chatbot Groq</h1>
                <p className="text-xs opacity-80">Portfolio Demo</p>
            </header>

            {/* Error Banner */}
            {error && (
                <div className="bg-red-100 border-b border-red-200 text-red-700 px-4 py-2 text-sm">
                    {error}
                </div>
            )}

            {/* Main Chat Area */}
            <ChatWindow messages={messages} />

            {/* Input Bar */}
            <InputBar
                value={input}
                onChange={setInput}
                onSend={handleSend}
                loading={loading}
            />
        </div>
    );
};

export default App;

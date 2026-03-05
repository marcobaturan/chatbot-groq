/**
 * Handler para la función serverless /api/chat.
 * Procesa peticiones POST con un historial de mensajes,
 * añade un system prompt y consulta la API de Groq.
 */

export default async function handler(req, res) {
    // Solo se permiten peticiones POST
    // Regla backend 1
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { messages } = req.body || {};

    // Validación del array de mensajes
    // Reglas backend 2
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'No messages provided.' });
    }

    // System prompt inyectado como primer mensaje
    // Regla backend 4 y 5
    const systemPrompt = {
        role: 'system',
        content: 'You are a helpful and concise AI assistant embedded in a website. Answer clearly and briefly. If you do not know something, say so. Do not make up information.'
    };

    // Verificación de la API Key en el entorno
    const apiKey = process.env['chatbot_groq_api_key'];
    if (!apiKey) {
        console.error('ERROR: La variable de entorno chatbot_groq_api_key no está definida.');
        return res.status(500).json({ error: 'AI service configuration error.' });
    }

    try {
        // Llamada a la API de Groq sin SDK (usando fetch nativo)
        // Regla backend 3 (GROQ_API_KEY desde process.env)
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [systemPrompt, ...messages],
                max_tokens: 1024,
                temperature: 0.7
            })
        });

        // Manejo de errores de la API externa
        // Regla backend 6
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Groq API Error:', errorData);
            return res.status(502).json({ error: 'Failed to connect to AI service.' });
        }

        const data = await response.json();

        // Devolvemos solo el texto de la respuesta del asistente
        // Regla backend 5
        const result = data.choices?.[0]?.message?.content || '';

        return res.status(200).json({ result });

    } catch (err) {
        // Error de red o ejecución
        console.error('Backend handler error:', err);
        return res.status(502).json({ error: 'Failed to connect to AI service.' });
    }
}

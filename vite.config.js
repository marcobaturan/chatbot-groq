import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Middleware para simular la función serverless de Vercel en desarrollo local.
// Vite no sirve /api/ automáticamente. Este plugin intercepta las llamadas a /api/chat.
function apiMiddleware() {
  return {
    name: 'api-middleware',
    configureServer(server) {
      // Cargamos variables de entorno para que estén disponibles en process.env localmente
      const env = loadEnv(server.config.mode, process.cwd(), '');
      process.env['chatbot_groq_api_key'] = env['chatbot_groq_api_key'];

      server.middlewares.use('/api/chat', async (req, res) => {
        console.log(`[API Middleware] Request: ${req.method} ${req.url}`);

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end();
          return;
        }

        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body);
            console.log('[API Middleware] Body received:', parsed);

            // Importación dinámica del handler
            const { default: handler } = await import('./api/chat.js');

            // Mock del objeto res para que funcione igual que en Vercel
            const vercelRes = {
              status: (code) => {
                res.statusCode = code;
                return vercelRes;
              },
              json: (data) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
                return vercelRes;
              },
              end: () => {
                res.end();
                return vercelRes;
              }
            };

            await handler({ method: req.method, body: parsed }, vercelRes);
          } catch (err) {
            console.error('[API Middleware] Error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Local middleware error', details: err.message }));
          }
        });
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiMiddleware()],
});

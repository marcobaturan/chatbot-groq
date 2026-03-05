/**
 * Prueba de integración para el endpoint /api/chat.
 * Verifica que el handler de Vercel responda correctamente a las peticiones POST
 * y maneje errores básicos.
 */

import handler from '../api/chat.js';

// Mock de Respuesta de Express/Vercel
const createMockRes = () => {
    const res = {
        statusCode: 200,
        headers: {},
        data: null,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(obj) {
            this.data = obj;
            return this;
        },
        setHeader(name, value) {
            this.headers[name] = value;
            return this;
        },
        end(msg) {
            this.data = msg;
            return this;
        }
    };
    return res;
};

async function testApiChat() {
    console.log('--- Iniciando tests de /api/chat ---');

    // Test 1: Rechazar métodos que no sean POST
    console.log('Test 1: Rechazar GET...');
    const res1 = createMockRes();
    await handler({ method: 'GET' }, res1);
    if (res1.statusCode === 405) {
        console.log('✅ OK: Método no permitido (405)');
    } else {
        console.log(`❌ ERROR: Se esperaba 405 y se obtuvo ${res1.statusCode}`);
    }

    // Test 2: Error 400 si no hay mensajes
    console.log('Test 2: Validar mensajes faltantes...');
    const res2 = createMockRes();
    await handler({ method: 'POST', body: {} }, res2);
    if (res2.statusCode === 400) {
        console.log('✅ OK: Error de validación (400)');
    } else {
        console.log(`❌ ERROR: Se esperaba 400 y se obtuvo ${res2.statusCode}`);
    }

    console.log('--- Tests finalizados ---');
}

testApiChat().catch(err => {
    console.error('Error durante la ejecución de los tests:', err);
    process.exit(1);
});

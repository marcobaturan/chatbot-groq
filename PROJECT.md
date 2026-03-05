# PROJECT.md — Chatbot Groq

## Status
Phase: **Planning → Development**

## Functional description
Standalone web application that renders an embeddable AI chatbot powered by Groq. Deployed on Vercel. Can be embedded in any website (including WordPress) via script tag or iframe. Portfolio project demonstrating conversational AI integration in a real deployable product.

## System type
Generative. External LLM (Groq) via REST API call from Vercel serverless function. No local model. No database. Conversation history managed in React state (session only).

## Stack
| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS (CDN) |
| AI | Groq API — llama-3.3-70b-versatile |
| Backend | Vercel Serverless Functions (Node.js) |
| Hosting | Vercel |
| Repo | https://github.com/marcobaturan/chatbot-groq |

## Technical decisions
- Groq API key in Vercel environment variable. Never on client.
- No database. No authentication.
- Conversation history passed on every request as messages array (stateless backend).
- Single serverless endpoint: POST /api/chat
- Standalone demo page: no WordPress dependency for portfolio purposes.

## Environment variables
| Variable | Exact name | Environment |
|---|---|---|
| Groq API key | GROQ_API_KEY | .env.local and Vercel |

## Folder structure
```
chatbot-groq/
├── PROJECT.md
├── BRIEFING.md
├── .antigravity/
│   └── rules.md
├── .agent/
│   └── skills/
│       ├── frontend/SKILL.md
│       └── backend/SKILL.md
├── patterns/
│   ├── js/fetch/post-with-error/
│   ├── js/snippets/safe-json-parse/
│   ├── html/layouts/base-page/
│   └── css/layouts/grid-responsive/
├── public/
│   └── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   └── components/
│       ├── ChatWindow.jsx
│       ├── MessageBubble.jsx
│       └── InputBar.jsx
├── api/
│   └── chat.js
├── .env.local
├── .gitignore
├── package.json
└── vite.config.js
```

## Endpoints
| Method | Route | Input | Output |
|---|---|---|---|
| POST | /api/chat | `{ messages: Message[] }` | `{ result: string }` or `{ error: string }` |

## Message format
```json
{ "role": "user" | "assistant", "content": "string" }
```

## Conventions
- Code language: English
- Comments language: Spanish
- Commits: conventional format (feat:, fix:, docs:, refactor:, chore:)
- Scaffolding: manual, no create-vite
- Local middleware: always in vite.config.js to simulate /api/chat locally

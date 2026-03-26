# Chatbot Groq: High-Performance, Embeddable AI for Direct Website Integration

> **Hook:** Deploy a secure, low-latency AI assistant to any site in minutes.

## ⚡ The 30-Second Summary

- **Problem:** Businesses need interactive AI on their websites but often face high latency, complex backend requirements, and the risk of exposing sensitive API keys in the frontend.
- **Solution:** A stateless, serverless architecture that bridges a React-based frontend with Groq's Llama-3-70B via Vercel Edge. This ensures **100% secure API handling** and sub-second response times.
- **Impact:** Demonstrates a production-ready pattern for AI integration, reducing development time for embeddable chatbots while maintaining enterprise-grade security.

## 🚀 Benefit-Driven Features

- **Instant Deployment:** Embed into WordPress, Shopify, or any HTML site via a single script tag or iframe.
- **Enterprise Security:** API keys are isolated in Vercel Serverless Functions, never reaching the client-side code.
- **Sub-Second Latency:** Leverages Groq's high-speed inference (Llama-3.3-70B) for a fluid, human-like chat experience.
- **Zero-Maintenance Backend:** Stateless design eliminates the need for a database, reducing infrastructure complexity and cost.

## 🛠️ Technical Decisions

| Tech Choice | Specific Tool | The "Why" / Engineering Rationale |
| :--- | :--- | :--- |
| **Inference** | Groq (Llama-3.3-70B) | Maximizes interaction speed and accuracy, crucial for user retention in conversational interfaces. |
| **Backend** | Vercel Serverless | Implements a "Backend-for-Frontend" (BFF) pattern to secure API keys without managing dedicated servers. |
| **Frontend** | React + Vite | Provides a lightweight, reactive UI with fast build times for rapid deployment and smooth state management. |
| **Deployment** | Vercel Edge | Ensures global low-latency delivery and seamless scaling for embeddable components. |

## 💻 How to Run

1.  **Clone & Install:**
    ```bash
    git clone https://github.com/marcobaturan/chatbot-groq
    cd chatbot-groq
    npm install
    ```

2.  **Environment Setup:**
    Create a `.env.local` file in the root:
    ```bash
    chatbot_groq_api_key=your_api_key_here
    ```

3.  **Development Start:**
    ```bash
    npm run dev
    ```

---
*Developed by [Marco Baturan](https://github.com/marcobaturan)*

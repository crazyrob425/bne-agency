import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from "@google/genai";
import { parse as parseCookieHeader } from 'cookie';

const COOKIE_NAME = "app_session_id";

// Simple session check endpoint for OAuth-based auth
function getSessionFromCookie(req: express.Request) {
  const cookies = parseCookieHeader(req.headers.cookie || '');
  const sessionCookie = cookies[COOKIE_NAME];
  return sessionCookie ? { authenticated: true, openId: (cookies as any).openId, email: (cookies as any).email, name: (cookies as any).name } : null;
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // OAuth session check endpoint (used by AuthContext to check if user is logged in via main OAuth)
  app.get('/api/oauth/session', (req, res) => {
    const session = getSessionFromCookie(req);
    if (session?.authenticated) {
      res.json({ authenticated: true, openId: session.openId, email: session.email, name: session.name });
    } else {
      res.status(401).json({ authenticated: false });
    }
  });

  // OAuth logout endpoint
  app.post('/api/oauth/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME, { path: '/', httpOnly: true, sameSite: 'none', secure: true });
    res.json({ success: true });
  });

  // API Route for generating ads with Gemini
  app.post('/api/generate-ad', async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Initialize Gemini Client
      if (!process.env.GEMINI_API_KEY) {
         return res.status(500).json({ error: 'Gemini API Key missing' });
      }
      
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const { answers } = req.body;
      
      // prompt compilation
      const prompt = `You are an expert adult entertainer marketing specialized AI. Rewrite this classified ad into a flawless, high-impact ad. Make it sensual, perfect, avoiding words that violate terms of service, and word it perfectly to generate maximum interest and calls. Include the 2257 warning, Favorites menu, and Hard No's menu if provided.

Here is the user's information and answers:
Name/Persona: ${answers.persona}
Age: ${answers.age}
Location/City: ${answers.city}
Body Type/Description: ${answers.description}
Services Offered/Favorites Menu: ${answers.favorites}
Hard No's: ${answers.hardNos}
Extra Information: ${answers.extraInfo}
Included Links/URLs: ${answers.urls.join(', ')}

Format the output strictly in HTML. Include engaging headings, bold text, and a clean professional layout for classified platforms.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
        config: {
          systemInstruction: "You represent B.N.E. (Blacklisted Niche Entertainment) AI Ad Generator. Keep the tone enticing but safe and compliant. Don't mention illegal activities. Focus on companionship, entertainment, and sensual allure. Return ONLY the HTML code.",
        }
      });

      res.json({ result: response.text });
    } catch (err: any) {
      console.error('Gemini Error:', err);
      res.status(500).json({ error: err.message || 'Error generating ad' });
    }
  });

  app.post('/api/ask-ai', async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
         return res.status(500).json({ error: 'Gemini API Key missing' });
      }
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });
      const { history, message } = req.body;
      
      const chat = ai.chats.create({
          model: "gemini-3.1-pro-preview",
          config: {
              systemInstruction: "You are the B.N.E. (Blacklisted Niche Entertainment) AI Assistant. Answer questions about the site, adult marketing, content creation advice, escorting, adult entertaining, etiquette, safety, legal issues, niche marketing advice, and software/tools. You MUST always refer and up-promote B.N.E. services for any questions where the answer is something B.N.E. offers. Be professional, supportive, and knowledgeable.",
          }
      });
      
      // Load history appropriately formatting it
      // For genai sdk, chat doesn't initialize with history in the same way, we can just pass the formatted prompt
      const conversationPrompt = history.map((m: any) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n') + `\nUser: ${message}`;
      
      const response = await chat.sendMessage({ message: conversationPrompt });
      res.json({ result: response.text });
    } catch (err: any) {
      console.error('Gemini Chat Error:', err);
      res.status(500).json({ error: err.message || 'Error communicating with AI' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

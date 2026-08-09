import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { SHURA_KNOWLEDGE_BASE, buildRawKnowledgeBaseText } from "./src/data/shuraKnowledgeBase.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "The 56th Star Initiative" });
  });

  // GET Raw Knowledge Base Data
  app.get("/api/knowledge-base", (_req, res) => {
    res.json(SHURA_KNOWLEDGE_BASE);
  });

  // Gemini API Endpoint for AI Shūrā Constitutional Consultation
  app.post("/api/shura-consult", async (req, res) => {
    try {
      const { prompt, history, customKnowledge } = req.body;

      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY environment variable is not configured. AI Assistant is currently in preview mode."
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });

      const rawKbText = buildRawKnowledgeBaseText();
      const userCustomKbBlock = typeof customKnowledge === 'string' && customKnowledge.trim()
        ? `\n\n=== USER UPLOADED / PROPRIETARY RESEARCH DATASET ===\nThe user/researcher has provided the following proprietary research datasets and documents to augment your knowledge base:\n\n${customKnowledge.trim()}\n`
        : '';

      const systemInstruction = `You are the Constitutional AI Advisor for "The 56th Star Initiative" — a Sphinx Analysis project exploring Sixth Region constitutional consultation for the African Diaspora.
You serve in the spirit of Shūrā (mutual consultation), objective analysis, and TTL (Truth, Transparency, Legacy).

You must directly reference, cite, and stay grounded in the following official Raw Knowledge Base and any user-provided proprietary research datasets:

${rawKbText}${userCustomKbBlock}

GUIDELINES FOR RESPONSES:
1. Grounding: Maintain absolute fidelity to the raw knowledge base and user proprietary research datasets above.
2. Stance & Posture: Always emphasize that "The 56th Star" is a constitutional inquiry offered pursuant to Article 3(q) of the AU Constitutive Act, not an established state or passport issuer.
3. Proprietary Syntheses: When the user asks about specific research notes or uploaded context, explicitly reference the uploaded datasets and how they align with the 56th Star Initiative framework.
4. Tone: Dignified, scholarly, balanced, objective, and respectful.
5. Structure: Use clear formatting with bullet points and bold headers where appropriate.`;

      // Build contents array with history if available
      const contents: any[] = [];
      
      if (Array.isArray(history) && history.length > 0) {
        for (const item of history) {
          contents.push({
            role: item.role === "user" ? "user" : "model",
            parts: [{ text: item.text }]
          });
        }
      }

      contents.push({
        role: "user",
        parts: [{ text: prompt }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      return res.json({
        text: response.text || "Thank you for your consultation query. Please review the 56th Star working papers for detailed analysis.",
      });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      return res.status(500).json({
        error: err.message || "An error occurred during AI Shūrā consultation."
      });
    }
  });

  // Vite middleware in development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Static file serving in production
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});

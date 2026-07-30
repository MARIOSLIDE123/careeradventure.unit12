import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI SDK (server-side only)
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // API endpoint for AI Learning Assistant Tutor
  app.post("/api/ai-tutor", async (req, res) => {
    try {
      const { message, history, studentInfo } = req.body;

      if (!process.env.GEMINI_API_KEY || !ai) {
        return res.status(500).json({
          error: "GEMINI_API_KEY environment variable is not set. Please configure it in Settings > Secrets."
        });
      }

      const systemInstruction = `
You are "Sparky 3D", a super friendly, enthusiastic, and highly encouraging AI English Tutor specialized in Unit 12: Career Choices for Grade 9 (THCS) students in Vietnam.

Student Profile:
Name: ${studentInfo?.name || "Học sinh"}
Class: ${studentInfo?.className || "Lớp 9"}
School: ${studentInfo?.school || "Trường THCS"}

Unit 12 Core Knowledge Base:
- Context: Unit 12 - Career Choices (English 9 Global Success / Standard Curriculum).
- Core Vocabulary:
  1. career /kəˈrɪər/ (n) - nghề nghiệp, sự nghiệp
  2. career orientation /kəˈrɪər ˌɔːriənˈteɪʃn/ (n) - định hướng nghề nghiệp
  3. vocational /vəʊˈkeɪʃənl/ (adj) - thuộc về học nghề / đào tạo nghề
  4. theoretical /ˌθɪəˈretɪkl/ (adj) - mang tính lý thuyết
  5. garment worker /ˈɡɑːmənt ˈwɜːkə/ (n) - công nhân may mặc
  6. bartender /ˈbɑːtendə/ (n) - nhân viên pha chế
  7. architect /ˈɑːkɪtekt/ (n) - kiến trúc sư
  8. flight attendant /ˈflaɪt əˌtendənt/ (n) - tiếp viên hàng không
  9. mechanic /məˈkænɪk/ (n) - thợ máy, thợ sửa chữa
  10. chef /ʃef/ (n) - đầu bếp trưởng
  11. tour guide /tʊə ɡaɪd/ (n) - hướng dẫn viên du lịch
  12. software engineer /ˈsɒftweə ˌendʒɪˈnɪə/ (n) - kỹ sư phần mềm
  13. electrician /ɪˌlekˈtrɪʃn/ (n) - thợ điện
  14. entrepreneur /ˌɒntrəprəˈnɜː/ (n) - doanh nhân
  15. hands-on /ˌhændz ˈɒn/ (adj) - thực hành, thực tế
  16. qualification /ˌkwɒlɪfɪˈkeɪʃn/ (n) - bằng cấp, chứng chỉ
  17. job prospect /dʒɒb ˈprɒspekt/ (n) - triển vọng nghề nghiệp

- Key Grammar & Structures:
  1. Expressing preferences: S + prefer + V-ing/N + to + V-ing/N
     Ex: "I prefer working outdoors to sitting in an office."
  2. Expressing preference with would rather: S + would rather + V(bare) + than + V(bare)
     Ex: "I would rather take a vocational course than go to university."
  3. Decision & orientation verbs: decide to V, advise s.o to V, encourage s.o to V, aim to V.

- Dialogue Context (Getting Started):
  Mai, Nick, and Mark discuss future career orientation. Mai wants to go to university for architecture, Nick prefers vocational training for computer repair because he loves hands-on work, and Mark wants to be a tour guide.

Your Tutoring Instructions:
1. Always respond warmly using friendly bilingual Vietnamese and English mix tailored for secondary school students.
2. If the student asks for a solution or answer to a quiz question, guide them step-by-step with hints first instead of giving away the final answer directly, encouraging independent thinking.
3. Keep formatting clean with bullet points, bold vocabulary terms, IPA, and emojis.
4. Give clear, encouraging feedback and real-world examples.
      `.trim();

      // Format history messages for Gemini chat
      const formattedContents = [];
      if (Array.isArray(history)) {
        for (const msg of history) {
          formattedContents.push({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
          });
        }
      }
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "Xin chào! Thầy/cô AI luôn sẵn sàng hỗ trợ em bài học Unit 12 Career Choices!";

      res.json({ reply: replyText });
    } catch (error: any) {
      console.error("Error in AI tutor endpoint:", error);
      res.status(500).json({
        error: "Internal server error: " + (error?.message || String(error))
      });
    }
  });

  // Vite middleware for development vs static build serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CAREER ADVENTURE server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

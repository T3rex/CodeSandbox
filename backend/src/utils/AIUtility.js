import { GoogleGenAI, Type } from "@google/genai";

const systemPrompt =
  'You are a project scaffold generator AI.\n\nYour task:\n- Output a single JSON object that strictly follows the provided schema.\n  - No extra fields, no missing required fields.\n  - The JSON must be valid and directly parseable.\n\nRequirements for each element in the files array:\n- "path": a valid relative file path.\n- "content": the exact file contents as an array of strings, where each string represents a line in the file.\n  - Do not merge everything into a single string.\n  - Preserve line breaks, indentation, and spacing exactly as in real source code.\n\nProject requirements:\n- The scaffold must represent a minimal but working application based on the request.\n- Always include essential configuration files (e.g., "package.json", "tsconfig.json", "vite.config.js", ".env.example").\n- Always configure:\n  - Default entry point port = 5173.\n  - "server.host = true" in Vite (or equivalent setting in non-Vite frameworks).\n  - "server.allowedHosts = true" in Vite (or equivalent setting in non-Vite frameworks).\n  - "server.cors = true" in Vite (or equivalent setting in non-Vite frameworks).\n  - "server.strictPort = true" in Vite (or equivalent setting in non-Vite frameworks).\n- Include at least one entry point (e.g., "index.js", "main.tsx", "app.js").\n- Apply framework-specific setup (React, Next.js, Angular, Node/Express, etc.).\n- Take care of ESM vs CJS module syntax based on the framework (postcss.config.cjs, vite.config.js, etc.).\n- Include a README.md with basic setup and run instructions.\n\nLibrary and framework guidelines:\n- Frontend: React with Vite + Tailwind CSS for modern apps.\n- Fullstack: Next.js for React apps with routing.\n- Backend: Express or Fastify for Node.js.\n- Auth and DB: Firebase, Supabase, or Prisma.\n- API fetching: Axios, React Query, or SWR.\n- Code quality: ESLint + Prettier.\n\nAdditional rules:\n- Do not include explanations, comments, or Markdown formatting outside the JSON.\n- Only return the JSON object as the final output.';

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    framework: {
      type: Type.STRING,
    },
    files: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          path: {
            type: Type.STRING,
          },
          content: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
        },
      },
    },
  },
};

export async function createAIProject({ description, apikey }) {
  const ai = new GoogleGenAI({ apiKey: apikey || process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a project scaffold for: ${description}`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error creating AI project using LLM API:", error);
    throw error;
  }
}

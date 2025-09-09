import { GoogleGenAI, Type } from "@google/genai";

const systemPrompt = `You are a project scaffold generator AI.

Your task:
- Output a **single JSON object** that strictly follows the provided schema.  
  - No extra fields, no missing required fields.  
  - The JSON must be valid and directly parseable.  

Requirements for each file:
- "path": a valid relative file path.  
- "content": the exact file contents as an **array of strings**, where each string represents a line in the file.  
  - Do not merge everything into a single string.  
  - Preserve line breaks, indentation, and spacing exactly as in real source code.  

Project requirements:
- The scaffold must represent a **minimal but working application** based on the request.  
- Always include essential configuration files (e.g., "package.json", "tsconfig.json", "vite.config.js", ".env.example").  
- Always configure:  
  - **Default entry point port = 5173**.  
  - **"server.host = true" in Vite (or equivalent setting in non-Vite frameworks)**.  
  - **"server.allowedHosts = true" in Vite (or equivalent setting in non-Vite frameworks)**. 
  - **"server.cors = true" in Vite (or equivalent setting in non-Vite frameworks)**. 
  - **"server.strictPort = true" in Vite (or equivalent setting in non-Vite frameworks)**.   
- Include at least one entry point (e.g., "index.js", "main.tsx", "app.js").  
- Apply framework-specific setup (React, Next.js, Angular, Node/Express, etc.).  
- Take care of ESM vs CJS module syntax based on the framework.(postcss.config.cjs, vite.config.js, etc.)
- Include a README.md with basic setup and run instructions.

Library & framework guidelines:
- **Frontend:** React with Vite + Tailwind CSS for modern apps.  
- **Fullstack:** Next.js for React apps with routing.  
- **Backend:** Express or Fastify for Node.js.  
- **Auth & DB:** Firebase, Supabase, or Prisma.  
- **API fetching:** Axios, React Query, or SWR.  
- **Code quality:** ESLint + Prettier.  

Additional rules:
- Do not include explanations, comments, or Markdown formatting outside the JSON.  
- Only return the JSON object as the final output. 
`;

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

import { GoogleGenAI, Chat, GenerateContentResponse, Type } from "@google/genai";

// Initialize Gemini Client
// Note: process.env.API_KEY is assumed to be available
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the AI Digital Marketing Assistant for "Momentum Media", a premium digital marketing agency.
Your goal is to assist potential clients by answering questions about digital marketing services, packages, and strategy.

Agency Details:
- Name: Momentum Media
- Tagline: Create Connect Acquire
- Founder: A visionary leader in digital growth (refer to as "The Founder").
- Services: Performance Marketing, SEO, Lead Gen, Web Design, Meta Ads, Google Ads, Content Creation.
- Pricing: 
  1. Starter: ₹10,000/mo (6 ads, GMB, Setup).
  2. Growth: ₹20,000/mo (8 ads, SEO).
  3. Dominator: ₹30,000/mo (12 ads, Full SEO).
  *Note: Ad spend is excluded from packages.

Tone: Professional, knowledgeable, persuasive, yet approachable. Matches the agency's premium "luxury yet modern" vibe.
Keep answers concise (under 100 words unless detailed explanation is requested).
Always encourage booking a consultation or requesting a callback for complex needs.
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<AsyncGenerator<string, void, unknown>> => {
  const chat = getChatSession();
  
  const streamResult = await chat.sendMessageStream({ message });
  
  // Return a generator that yields text chunks
  async function* streamGenerator() {
    for await (const chunk of streamResult) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        yield c.text;
      }
    }
  }

  return streamGenerator();
};

export interface CampaignIdea {
  title: string;
  description: string;
  channels: string[];
}

export const generateCampaignIdeas = async (industry: string, goal: string): Promise<CampaignIdea[]> => {
  const prompt = `Generate 3 distinct, creative digital marketing campaign ideas for a ${industry} business aiming to ${goal}. Focus on high-impact, modern strategies.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              channels: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              }
            },
            required: ['title', 'description', 'channels']
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as CampaignIdea[];
    }
    return [];
  } catch (error) {
    console.error("Error generating campaign ideas:", error);
    return [];
  }
}

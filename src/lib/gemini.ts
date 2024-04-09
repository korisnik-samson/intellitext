import { GoogleGenerativeAI } from "@google/generative-ai";

export const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const model = genAI.getGenerativeModel({ model: "gemini-pro" });
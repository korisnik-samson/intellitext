import OpenAI from "openai";

export const openai: OpenAI = new OpenAI({
    apiKey: process.env.OPENAI_API_TEST_KEY,
    organization: process.env.OPENAI_ORG_ID,
})
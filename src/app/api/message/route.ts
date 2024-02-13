import { NextRequest } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { SendMessageValidator } from "@/lib/validators/SendMessageValidator";
import { db } from "@/db";
import { OpenAIEmbeddings } from "@langchain/openai";
import { pinecone } from "@/lib/pinecone";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";
import { openai } from "@/lib/openai";
import { genAI } from "@/lib/gemini"
import { OpenAIStream, GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

export const POST = async (req: NextRequest) => {
    // endpoint for asking a question to a pdf file
    const body = await req.json();

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // @ts-ignore
    const { id: userId } = user;

    if (!userId) return new Response('Unauthorized', { status: 401 })

    const { fileId, message } = SendMessageValidator.parse(body)
    const file = await db.file.findFirst({
        where: {
            id: fileId,
            userId,
        }
    });

    if (!file) return new Response('Not found', { status: 404 })

    await db.message.create({
        data: {
            text: message, isUserMessage: true,
            userId, fileId
        }
    });

    // 1: Vectorize message
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_TEST_KEY
    });

    const pineconeIndex = pinecone.index('chatpdf-pro')

    // potential errors
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex,
        namespace: file.id
    })

    const results = await vectorStore.similaritySearch(message, 4)

    const previousMessages = await db.message.findMany({
        where: { fileId }, orderBy: { createdAt: 'asc' }, take: 6
        // the take can be increased...
    });

    const formattedPrevMessages = previousMessages.map((msg) => ({
        role: msg.isUserMessage ? 'user' as const : 'assistant' as const,
        content: msg.text
    }));

    // debugging purposes
    // console.log('injecting prompt...')

    const openai_response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        temperature: 0,
        stream: true,
        messages: [
            {
                role: 'system',
                content:
                    'Use the following pieces of context (or previous conversation if needed)' +
                    ' to answer the users question in markdown format.',
            },
            {
                role: 'user',
                content: `Use the following pieces of context (or previous conversation if needed)
                to answer the users question in markdown format. \nIf you don't know the answer, 
                just say that you don't know, don't try to make up an answer.
                \n----------------\n
                PREVIOUS CONVERSATION:
                ${formattedPrevMessages.map((message) => {
                    if (message.role === 'user') return `User: ${message.content}\n`
                    return `Assistant: ${message.content}\n`
                })}
                    \n----------------\n
                CONTEXT:
                ${results.map((r) => r.pageContent).join('\n\n')}
                USER INPUT: ${message}`,
            },
        ],
    });

    const gemini_response = await genAI

    // console.log('closing prompt');

    const stream = OpenAIStream(openai_response, {
        async onCompletion(completion): Promise<void> {
            await db.message.create({
                data: {
                    text: completion,
                    isUserMessage: false,
                    fileId,
                    userId
                }
            })
        }
    })

    // const gemini_stream = GoogleGenerativeAIStream()

    return new StreamingTextResponse(stream)
}
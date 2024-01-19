import { Pinecone } from '@pinecone-database/pinecone'

export const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
    // controllerHostUrl: process.env.PINECONE_CONTROLLER_HOST
})

/*
export const getPineconeClient = async () => {
    const client = new PineconeClient();

    await client.init({
        apiKey: process.env.PINECONE_API_KEY!,
        environment: 'gcp-starter'
    })

    return client;
}*/

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/db";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { pinecone } from "@/lib/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
// import { PineconeStore } from "@langchain/community/vectorstores/pinecone";
import { VectorStore } from "@langchain/core/vectorstores";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { PLANS } from "@/config/stripe";
import { IOnUploadCompleteProps } from "@/types";

const f = createUploadthing();

export const middleware = async() => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) throw new Error('Unauthorized User');

    // subscription enforcement
    const subscriptionPlan = await getUserSubscriptionPlan()

    return { subscriptionPlan, userId: user.id };
}

const onUploadComplete = async({ metadata, file }: IOnUploadCompleteProps) => {
    const isFileExist = await db.file.findFirst({
        where: { key: file.key },
    })

    if (isFileExist) return

    const createdFile = await db.file.create({
        data: {
            key: file.key,
            name: file.name,
            userId: metadata.userId,
            url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
            uploadStatus: 'PROCESSING',
        }
    })

    try {
        const response = await fetch(`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`)
        const blob = await response.blob()

        const loader = new PDFLoader(blob)
        const pageLevelDocs = await loader.load()
        const pagesAmt = pageLevelDocs.length

        const { subscriptionPlan } = metadata
        const { isSubscribed } = subscriptionPlan

        // check if pro plan is exceeded
        // @ts-ignore
        const isProExceeded = pagesAmt > PLANS.find((plan) => plan.name === 'Pro')!.pagesPerPDF
        // @ts-ignore
        const isFreeExceeded = pagesAmt > PLANS.find((plan) => plan.name === 'Free')!.pagesPerPDF

        // Subscription enforcement
        if ((isSubscribed && isProExceeded) || (!isSubscribed && isFreeExceeded)) {
            await db.file.update({
                data: { uploadStatus: 'FAILED' },
                where: { id: createdFile.id }
            })
        }

        // vectorize and index the entire document
        const pineconeIndex = pinecone.index('chatpdf-pro');

        const embeddings= new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_TEST_KEY,
        });

        // use the code below to create a new index as this is deprecated
/*
        await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
            pineconeIndex,
            namespace: createdFile.id,
        });
*/

        await VectorStore.fromDocuments(pageLevelDocs, embeddings, {
            pineconeIndex,
            namespace: createdFile.id,
        });

        await db.file.update({
            data: { uploadStatus: 'SUCCESS' },
            where: { id: createdFile.id }
        })

    } catch (err: any) {
        await db.file.update({
            data: { uploadStatus: 'FAILED' },
            where: { id: createdFile.id }
        })
    }
}

export const ourFileRouter = {
    freePlanUploader: f({ pdf: { maxFileSize: '64MB' } })
        .middleware(middleware)
        .onUploadComplete(onUploadComplete),

    proPlanUploader: f({ pdf: { maxFileSize: '32MB' } })
            .middleware(middleware)
            .onUploadComplete(onUploadComplete),
    
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
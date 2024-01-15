import { NextRequest } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const POST = async (req: NextRequest) => {
    // endpoint for asking a question to a pdf file
    const body = await req.json();

    const { getUser } = getKindeServerSession();
    const user = getUser();

    // @ts-ignore
    const { id: userId } = user;

    if (!userId) return new Response('UNAUTHORIZED', { status: 401 })

}
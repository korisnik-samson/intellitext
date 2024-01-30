import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: any): Promise<(req: any, res: any) => Response> {
    const endpoint = params.kindeAuth;
    return handleAuth(request, endpoint);
}
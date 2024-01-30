import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

/*

DEPRECATED FROM KINDE

export async function GET(request, { params }){
    const endpoint = params.kindeAuth;
    return handleAuth(request, endpoint);
}*/

export const GET = handleAuth();

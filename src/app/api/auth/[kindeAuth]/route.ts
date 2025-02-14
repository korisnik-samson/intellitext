import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export const GET = handleAuth();
/*

DEPRECATED FROM KINDE

export async function GET(request, { params }){
    const endpoint = params.kindeAuth;
    return handleAuth(request, endpoint);
}*/

/*export const GET = handleAuth({
    config: {
        clientId: process.env.KINDE_CLIENT_ID,
        clientSecret: process.env.KINDE_CLIENT_SECRET,  
        issuerURL: process.env.KINDE_ISSUER_URL,
        siteUrl: process.env.KINDE_SITE_URL,
        postLoginRedirectUrl: process.env.KINDE_POST_LOGIN_REDIRECT_URL,
        postLogoutRedirectUrl: process.env.KINDE_POST_LOGOUT_REDIRECT_URL,
    }
});*/

/*
config: {
    audience?: string | string[];
    clientId?: string;
    clientSecret?: string;
    issuerURL?: string;
    siteUrl?: string;
    postLoginRedirectUrl?: string;
    postLogoutRedirectUrl?: string;
};*/

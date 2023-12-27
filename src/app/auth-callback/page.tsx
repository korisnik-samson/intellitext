"use client"
import React from 'react'
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import { Loader2 } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const Page = () => {
    const router: AppRouterInstance = useRouter();
    const searchParams: ReadonlyURLSearchParams = useSearchParams();

    const origin = searchParams.get('origin');

    // issue with tRPC deprecated callbacks -> v4.35.5 --> v5.15.0
    trpc.authCallback.useQuery(undefined, {
        onSuccess: ({ success }) => {
            // user is synced to database
            if (success) router.push(origin ? `/${origin}` : '/dashboard')
        },
        onError: (err) => {
            if (err.data?.code === 'UNAUTHORIZED') router.push('/sign-in')
        },
        retry: true,
        retryDelay: 500,
    });

    return (
        <div className="w-full mt-24 flex justify-center">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className='h-8 w-8 animate-spin text-spin-800' />

                <h3 className="front-semibold text-xl">
                    Setting up your account...
                </h3>
                <p>You will be redirected automatically.</p>
            </div>
        </div>
    );
}

export default Page;
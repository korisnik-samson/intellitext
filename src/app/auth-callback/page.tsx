import React from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import { Loader2 } from "lucide-react";

const Page = async () => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const origin = searchParams.get('origin')

    const { data, isLoading } = trpc.authCallback.useQuery(undefined, {

        onSuccess: ({ success }: any) => {
            // user is synced to database
            if (success) router.push(origin ? `/${origin}` : '/dashboard')
        },
        onError: (err: any) => {
            if (err.data?.code === "UNAUTHORIZED") router.push("/sign-in")
        },
        retry: true,

        // retry every 500ms... this can be adjustable
        retryDelay: 500,
    })

    return (
        <div className="w-full mt-24 flex justify-center">
            <div className="flex flex-col items-center gap-2">
                <Loader2 />
            </div>
        </div>
    )
}

export default Page;
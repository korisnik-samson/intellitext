'use client'
import React from 'react'
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { trpc } from "@/app/_trpc/client";

const UpgradeButton = ({ isComingSoon, placeholder }: { isComingSoon: boolean, placeholder: string }) => {
    const { mutate: createStripeSession } = trpc.createStripeSession.useMutation({
        onSuccess: ({ url }) => {
            window.location.href = url ?? '/dashboard/billing'
        }
    })

    if (isComingSoon) {
        return (
            <Button variant='tertiary' className='w-full'>
                {placeholder}
            </Button>
        );
    }

    return (
        <Button onClick={() => createStripeSession()} className='w-full'>
            {placeholder} <ArrowRight className='h-5 w-5 ml-1.5' />
        </Button>
    )
}

export default UpgradeButton;
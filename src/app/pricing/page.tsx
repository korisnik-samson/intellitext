import React from 'react'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PLANS } from "@/config/stripe";
import { pricingItemsList } from "@/constants";
import { cn } from '@/lib/utils';
import { ArrowRight, Check, HelpCircle, Minus } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import UpgradeButton from "@/components/UpgradeButton";

const Page = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <React.Fragment>
            <MaxWidthWrapper className='mb-8 mt-24 text-center max-w-[1490px]'>
                <div className='mx-auto mb-10 sm:max-w-lg'>
                    <h1 className='text-6xl font-bold sm:text-7xl'>Pricing</h1>
                    <p className='mt-5 text-gray-600 sm:text-lg'>
                        Whether you&apos;re just trying out our service
                        or need more, we&apos;ve got you covered
                    </p>
                </div>

                <div className="pt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <TooltipProvider>
                        {pricingItemsList.map(({ plan, tagline, quota, features }) => {
                            const price = PLANS.find(
                                (p) => p.slug === plan.toLowerCase())?.price.amount || 0

                            return (
                                <div key={plan} className={cn('relative rounded-2xl bg-white shadow-lg',
                                {'border-2 border-blue-600 shadow-blue-200': plan === 'Pro',
                                    'border-2 border-green-600 shadow-green-200': plan === 'Intelli',
                                    'border border-gray-200': plan !== 'Pro' && plan !== 'Intelli',  })}>
                                    {plan === 'Pro' && (
                                        <div className='absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r
                                        from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white'>
                                            Upgrade now
                                        </div>
                                    )}
                                    {plan === 'Intelli' && (
                                        <div className='absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r
                                        from-green-800 to-green-600 px-3 py-2 text-sm font-medium text-white'>
                                            Coming Soon
                                        </div>
                                    )}

                                    <div className='p-5'>
                                        <h3 className='my-3 text-center font-display text-3xl font-bold'>
                                            {plan}
                                        </h3>
                                        <p className='text-gray-500'>{tagline}</p>
                                        <p className='my-5 font-display text-6xl font-semibold'>€{price}</p>
                                        <p className='text-gray-500'>per month</p>
                                    </div>

                                    <div className='flex h-20 items-center justify-center border-b border-t
                                    border-gray-200 bg-gray-50'>
                                        <div className='flex items-center space-x-1'>
                                            <p>{quota.toLocaleString()} PDFs/mo included</p>

                                            <Tooltip delayDuration={300}>
                                                <TooltipTrigger className='cursor-default ml-1.5'>
                                                    <HelpCircle className='h-4 w-4 text-zinc-500' />
                                                </TooltipTrigger>
                                                <TooltipContent className='w-80 p-2'>
                                                    How many PDFs you can upload per month
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </div>

                                    <ul className='my-10 space-y-5 px-8'>
                                        {features.map(({ text, footnote, negative , isIntelli}) => (
                                            <li key={text} className='flex space-x-5'>
                                                <div className='flex-shrink-0'>
                                                    {isIntelli ? (
                                                        <div className='flex-shrink-0'>
                                                        {negative ? (
                                                            <Check className='h-6 w-6 text-gray-300'/>
                                                        ) : (
                                                            <Check className='h-6 w-6 text-green-500'/>
                                                        )}
                                                    </div> ) : (
                                                        <div className='flex-shrink-0'>
                                                        {negative ? (
                                                        <Minus className='h-6 w-6 text-gray-300' />
                                                        ) : (
                                                        <Check className='h-6 w-6 text-blue-500' />
                                                        )}
                                                    </div>)
                                                }
                                                </div>
                                                {footnote ? (
                                                    <div className='flex items-center space-x-1'>
                                                        <p className={cn('text-gray-400', {
                                                            'text-gray-600': negative,

                                                        })}>
                                                            {text}
                                                        </p>
                                                        <Tooltip delayDuration={300}>
                                                            <TooltipTrigger className='cursor-default ml-1.5'>
                                                                <HelpCircle className='h-4 w-4 text-zinc-500'/>
                                                            </TooltipTrigger>
                                                            <TooltipContent className='w-80 p-2'>
                                                                {footnote}
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                ) : (
                                                    <p className={cn('text-gray-400', {
                                                        'text-gray-600': negative,
                                                    })}>
                                                        {text}
                                                    </p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className='border-t border-gray-200' />
                                    <div className='p-5'>
                                        {plan === 'Free' ? (
                                            <Link href={user ? '/dashboard' : '/sign-in'} className={buttonVariants({
                                                className: 'w-full', variant: 'secondary' }
                                            )}>
                                                {user ? 'Continue' : 'Sign up'}
                                                <ArrowRight className='h-5 w-5 ml-1.5' />
                                            </Link>
                                        ) : plan === 'Pro' && user ? (
                                            <UpgradeButton isComingSoon={false} placeholder='Upgrade Now' />
                                        ) :  plan === 'Intelli' && user ? (
                                            /* TODO: Adjust Link function here when Intelli plan is ready */
                                            <Button variant='tertiary' aria-label='fullscreen' className='w-full'>
                                                {'Coming Soon'}
                                            </Button>
                                            ) : (
                                            <Link href='/sign-in' className={buttonVariants({
                                                className: 'w-full' }
                                            )}>
                                                {user ? 'Upgrade Now' : 'Sign up'}
                                                <ArrowRight className='h-5 w-5 ml-1.5' />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </TooltipProvider>
                </div>
            </MaxWidthWrapper>
        </React.Fragment>
    );
}

export default Page;
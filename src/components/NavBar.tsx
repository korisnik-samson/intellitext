import React from 'react'
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const NavBar = () => {
    return (
        <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75
        backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between border-b border-zinc-200">
                    <Link href='/' className="flex z-40 font-semibold">
                        {/*<span>ChatPDF</span>*/}
                        <Image  src='/brand/intelli_logo.png' alt='logo' width={140} height={140}/>
                    </Link>

                    {/* TODO: Add mobile NavBar */}

                    <div className="hidden items-center space-x-4 sm:flex">
                        <React.Fragment>
                            <Link href='/pricing' className={buttonVariants({
                                variant: 'ghost', size: 'sm' })}>
                                Pricing
                            </Link>

                            <LoginLink className={buttonVariants({
                                variant: 'ghost', size: 'sm' })}>
                                Sign in
                            </LoginLink>

                            <RegisterLink className={buttonVariants({
                                size: 'sm' })}>
                                Get Started
                                <ArrowRight className="ml-1.5 h-5 w-5" />
                            </RegisterLink>
                        </React.Fragment>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
}

export default NavBar;
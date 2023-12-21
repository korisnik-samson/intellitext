import React from 'react';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Page = () => {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    // @ts-ignore
    if (!user || !user.id) redirect('/auth-callback?origin=dashboard')

    return (
        // @ts-ignore
        <div>{user.email}</div>
    );
}

export default Page;
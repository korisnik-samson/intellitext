import React from 'react';
import { ReactNode } from "react";
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { ExtendedMessage } from "@/types/message";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { middleware } from "@/app/api/uploadthing/core";

export type MaxWidthWrapperProps = {
    className?: string;
    children: ReactNode;
}

export interface IPageProps {
    params: { fileid: string }
}

export type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorColor?: string;
}

export interface IPDFRendererProps {
    url: string;
}

export interface IPDFFullScreenProps {
    fileUrl: string;
}

export interface IChatWrapperProps {
    fileId: string;
}

export interface IChatInputProps {
    isDisabled?: boolean;
}

export type TStreamResponse = {
    addMessage: () => void,
    message: string,
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    isLoading: boolean,
}

export interface IChatContextProviderProps {
    fileId: string;
    children: ReactNode;
}

export interface IMessagesProps {
    fileId: string;
}

export interface IMessageProps {
    message: ExtendedMessage
    isNextMessageSamePerson: boolean;
}

export interface IBillingFormProps {
    subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>
}

export interface IUserAccountNavProps {
    email: string | undefined;
    name: string;
    imageUrl: string;
}

export interface IConstructMetadataTypes {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
}

export interface IOnUploadCompleteProps {
    metadata: Awaited<ReturnType<typeof middleware>>,
    file: {
        key: string,
        name: string,
        url: string
    }
}

export interface IDashboardProps {
    subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>
}
import React from 'react';
import { ReactNode } from "react";
import * as ProgressPrimitive from '@radix-ui/react-progress';

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
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
import { ReactNode } from "react";

export type MaxWidthWrapperProps = {
    className?: string;
    children: ReactNode;
}

export interface PageProps {
    params: {
        fileid: string
    }
}
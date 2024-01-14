import React, { createContext, useState } from 'react';
import { IChatContextProviderProps, TStreamResponse } from "@/types";

export const ChatContext = createContext({
    addMessage: () => {},
    message: '',
    handleInputChange: () => {},
    isLoading: false,
})

export const ChatContextProvider = ({ fileId, children }: IChatContextProviderProps) => {
    const [message, setMessage] = useState()
}
import React, { createContext, useState } from 'react';
import { IChatContextProviderProps, TStreamResponse } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

export const ChatContext = createContext<TStreamResponse>({
    addMessage: () => {},
    message: '',
    handleInputChange: () => {},
    isLoading: false,
});

export const ChatContextProvider = ({ fileId, children }: IChatContextProviderProps) => {
    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { toast } = useToast();

    const { mutate: sendMessage } = useMutation({
        mutationFn: async ({ message }: { message: string }) =>{
            const response = await fetch('/api/message', {
                method: 'POST',
                body: JSON.stringify({ fileId, message }),
            })

            if (!response.ok) throw new Error('Failed to send message')

            return response.body
        },
    })

    const handleInputChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(ev.target.value)
    }

    const addMessage = () => sendMessage({ message });

    return (
        <ChatContext.Provider value={{ addMessage, message, handleInputChange, isLoading }}>
            {children}
        </ChatContext.Provider>
    )
};


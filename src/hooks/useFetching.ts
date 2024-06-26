import { useState } from "react"

export const useFetching = (callback: (...args: number[]) => Promise<void>) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetching = async (...args: number[]) => {
        try {
            setIsLoading(true);
            await callback(...args);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error] as const;
}
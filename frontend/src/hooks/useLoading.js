import {useState} from "react";

export const useLoading = (callback) => {
    const [isLoading, setIsLoading] = useState(false);

    const load = async () => {
        setIsLoading(true)
        await callback()
        setIsLoading(false)
    }

    return [load, isLoading]
}

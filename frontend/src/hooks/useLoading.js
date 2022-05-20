import {useState} from "react";

export const useLoading = (callback) => {
    const [isLoading, setIsLoading] = useState(false);

    const load = async () => {
        setIsLoading(true)
        setTimeout(async () => {
            await callback()
            setIsLoading(false)
        }, 2000)
    }

    return [load, isLoading]
}

import { useEffect, useState } from "react";

export function useDebounce(initialValue, delay = 1000) {
    const [value, setValue] = useState("");
    useEffect(() => {
        const timer = setTimeout(() => {
            setValue(initialValue);
        }, delay);
        return () => {
            clearTimeout(timer);
        };
    }, [initialValue, delay]);
    return value;
}

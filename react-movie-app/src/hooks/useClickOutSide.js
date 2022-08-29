import { useEffect, useRef, useState } from "react";

export function useClickOutSide() {
    const nodeRef = useRef(null);
    const [show, setShow] = useState(false);
    useEffect(() => {
        function handleClick(e) {
            if (nodeRef.current && !nodeRef.current.contains(e.target)) {
                setShow(false);
            }
        }
        document.body.addEventListener("click", handleClick);
        return () => {
            document.body.removeEventListener("click", handleClick);
        };
    }, []);
    return { nodeRef, show, setShow };
}

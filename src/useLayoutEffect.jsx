import { useEffect,useRef, useLayoutEffect, useState } from "react"

export const useMeasure= (deps) => {
    const [rect, setRect] = useState({});
    const myRef = useRef();

    useLayoutEffect(() => { 
        // whenever you want to get a value from a dom mesaurement 
        setRect(myRef.current.getBoundingClientRect())
        console.log(myRef.current.getBoundingClientRect())
    },deps);
    return [rect,myRef];
}

import { useEffect, useRef, useState } from "react"
import {useFetch} from './customHook'
import { useMeasure } from "./useLayoutEffect";

export const useForm = initialValues => {
    const [values, setValues] = useState(initialValues);

    return [values, e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }]
}

export const FormExample = () => {

    const [values, handleChange] = useForm({email : '', password : ''});
    const [count,setCount] = useState(0);
    const {data,loading}  = useFetch(`http://numbersapi.com/${count}/trivia`);
    const inputRef = useRef();
    const [rect,divRef] = useMeasure([data]) //[data] is the dependency
    
    useEffect(()=>{
        //console.log('render') // in mounting

        const onMouseMove = (e) => {
            //console.log(e)
        }
        window.addEventListener('mousemove',onMouseMove)

        //clean up function
        return () => {
            //console.log('unmount')//here in unmounting , if we use with values we clean it first then go to the 
            //mounting stage and call 
            window.removeEventListener('mousemove',onMouseMove)
        }
    },[]);
    return(
        <div>
            <div style={{display : "flex"}}>
                <div ref={divRef}>{data != null ? data: "loading..."}</div>
            </div>
            <div>count: {count}</div>
            <button onClick={() => setCount(c => c + 1)}>increment</button>
            <br/>
            <input
            ref={inputRef}
            name="email"
            placeholder="enter your email"
            value={values.email}
            onChange={handleChange}/>
             <input
            name="password"
            placeholder="enter your password"
            type="password"
            value={values.password}
            onChange={handleChange}/>
            <br/>
            <button onClick={() => {console.log(inputRef.current)}}>
                show input ref 
            </button>
        </div>
    )
}


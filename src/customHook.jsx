import { useEffect, useRef, useState } from "react"


export const useFetch = url => {
    const isCurrent = useRef(true);
    const[state, setState] = useState({data : null, loading : true});

    useEffect(() => {
        return () => {
            //called when the component is going to unmount 
            isCurrent.current = false;
        }
    },[])
    useEffect(() => {
        setState(state => ({data: state.data, loading:true}))
        fetch(url)
        .then(x =>  x.text())
        .then(y => { 
            setState({data: null})
            setTimeout(() => {
                if(isCurrent.current){
                    setState({data: y , loading :false})
                }
                console.log(y);
            },2000)
            
         })
    },[url,setState]);
    return state;
};
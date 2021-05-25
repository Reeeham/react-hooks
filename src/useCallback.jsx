import { memo, useCallback, useRef, useState } from "react"



export const CallbackExample = () => { 
    const [count, setCount] = useState(0);
    const favoriteNums = [7,21,37]

    const increment = useCallback(
        n => { 
        //useCallback works that whenever  setCount changes it will
        //this function will be recreated or changing
        //here count is changing but function will not be changing and rendered every time
        setCount(count => count + n );
    },[setCount])
    return (
    <div>
        <Hello increment={increment}/>
         <div>Count :{count}</div>
         {favoriteNums.map((n)=> { 
             return(<Square key={n} increment={increment} n={n}/>);
         })}
    </div>)
}


export const Hello = memo(({increment}) => { //memo compare props and if props changed it's gonna re render the component,
    //so if the parent component is changed the child will also change
    useCountRenders();
    return <button onClick={increment(5)}>Increment</button>
});


export const useCountRenders = () => {
    const renders = useRef(0);
    console.log('renders : ',renders.current++)
}


export const Square = memo(({n, increment}) => { 
    useCountRenders();
    return <button onClick={() => increment(n)}>{n}</button>
});

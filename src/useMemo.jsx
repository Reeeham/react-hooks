import { useEffect, useMemo, useState } from "react"
import {useFetch} from './customHook';

  
function computeLongestWord(arr){

    if(!arr){
        return [];
    } 
    console.log('computing longest word')
    let longestWord = '';
    JSON.parse(arr).forEach(sentence => sentence.split(' ').forEach(word => {
        if(word.length > longestWord.length ) { 
            longestWord = word;
        }
    }));

    return longestWord;
}

export const MemoExample = () => {

    const [count,setCount] = useState(0);
    const {data} = useFetch("https://github.com/ajzbc/kanye.rest/blob/master/quotes.json");
  
    const longestWord = useMemo(() => computeLongestWord(data),[data,computeLongestWord])
    return (
    <div>
        <div>Count : {count}</div>
        <div>{longestWord}</div>
    </div>);
};
import { useReducer, useState } from "react";


function reducer(state, action){
    switch(action.type){
        case 'increment'  :
             return state + 1;
        case 'decrement'  :
            return state -1;
        case 'add-todo': 
             return {todos: [...state.todos,{text: action.text,completed :false}], todoCount: state.todoCount+1};
        case 'toggle-todo': 
             return {todos : state.todos.map((t,i) => i === action.index ? {...t,completed:!t.completed} : t), todoCount: state.todoCount }
        default: 
             return state;
    }
}
const ReducerExample = () => {

   // const [count, dispatch ] = useReducer(reducer,0);
    const [{todos,todoCount}, dispatch ] = useReducer(reducer,{todos:[],todoCount : 0});
    const [text,setText] = useState()
    return(
    <div>
        <form onSubmit={e=> {
            e.preventDefault();
            dispatch({type: 'add-todo',text});
            setText("");
        }}>
            <input placeholder="type and click enter" value={text} onChange={e => setText(e.target.value)}/>
        </form>
        {/* <pre>
            {JSON.stringify(todos,null,2)}
        </pre> */}
        <div>number of todos: {todoCount} </div>
        {todos.map((t,i )=> {
           return(<div key={t.text}
            style={{textDecoration : t.completed ?  "line-through" :  " "}}
             onClick={()=> dispatch({type :'toggle-todo',index: i})}>{t.text}</div>);
        })}
        {/* <div>Count: {count}</div>
        <button onClick={() => dispatch({type: 'increment'})}>increment</button>
        <button onClick={() => dispatch({type: 'decrement'})}>decrement</button> */}
    </div>)
}

export default ReducerExample;
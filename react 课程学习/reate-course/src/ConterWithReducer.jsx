import { useReducer } from "react";

const initialState = 0;

const reducer =(state, action) => {
  switch(action) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

export const ConterWithReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <p>{state}</p>
      <button onClick={() => dispatch('increment')}>增加</button>
      <button onClick={() => dispatch('decrement')}>减少</button>
      <button onClick={() => dispatch('reset')}>重置</button>
    </div>
  );
}
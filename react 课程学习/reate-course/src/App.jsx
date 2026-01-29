import Counter from './Counter.jsx'
import StateCounter from './StateCounter.jsx'
import { ShoppingCar } from './ShoppingCar.jsx'
import {ConterWithReducer} from './ConterWithReducer.jsx'

import './App.css'

function App() {

  return (
    <>
      <ConterWithReducer />
      <Counter />
      <StateCounter />
      <ShoppingCar />
    </>
  )
}

export default App

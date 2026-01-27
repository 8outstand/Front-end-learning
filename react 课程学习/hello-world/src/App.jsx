import './App.css'
import {Greeting} from './Greeting.jsx'
import Welcome from './Welcome.jsx'
import {Button} from './Button.jsx'
import {Hello, HellowithoutJSX} from './Hello.jsx'
import {TestProp} from './TestProp.jsx'
import {Spread} from './Spread.jsx'
import {Userdetails} from './Userdetails.jsx'
import {Alert} from './Alert.jsx'
import {LikeButton} from './LikeButton.jsx'

function App() {

  return (
    <div>
      <LikeButton />
      <Alert type="success">
        Something went wrong!
      </Alert>
      <Spread name="React" message="Hello React" react="18" />
      <TestProp name="tom">
        Hello world
      </TestProp>
      {/* <h1>Hello React</h1> */}
      <Greeting name="React" message="Hello React" />
      <Hello />
      <HellowithoutJSX />
      <Welcome />
      <Button />
      <Spread name="React" message="Hello React" />
      <Userdetails name="React" isOnline={true} />
      <Userdetails name="React" isOnline={false} />
    </div>
  )
}

export default App

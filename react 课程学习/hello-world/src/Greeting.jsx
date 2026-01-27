export const Greeting = ({name , message}) =>{
  return (
    <div id="container">
      <h1>{message}</h1>
      <p>Welcome, {name}!</p>
    </div>
  )
}
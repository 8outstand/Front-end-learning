export const TestProp = ({name, children}) =>{
  return (
    <div id="container">
      <h1>{children}</h1>
      <p>Welcome, {name}!</p>
    </div>
  )
}
export const Spread = ({name, ...props}) =>{
  return (
    <div id="container">
      <h1>{name}</h1>
      <p>{props.message}</p>
    </div>
  )
}
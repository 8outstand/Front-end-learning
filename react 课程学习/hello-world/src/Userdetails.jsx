export const Userdetails = ({name, isOnline}) =>{
  if(isOnline){
    return (
    <div id="container">
      <h3>{name}</h3>
      <p>
        <span role="img" aria-label="online">✅</span>
        Online
      </p>
    </div>
  )
  }
  return (
    <div id="container">
      <h3>{name}</h3>
      <p>
        <span role="img" aria-label="offline">❌</span>
        Offline
      </p>
    </div>
  )
}
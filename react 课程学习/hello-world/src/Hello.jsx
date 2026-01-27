import React from 'react'

export const Hello = () =>{
  return (
    <div id="container">
      <h1>Hello React</h1>
    </div>
  )
}

export const HellowithoutJSX = () =>{
  return React.createElement('div', {id: "container"}, 
    React.createElement('h4', null, 'Hello React')
  )
}

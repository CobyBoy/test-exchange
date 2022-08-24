import { useState } from 'react'
import './App.css'
import { ConverterContainer } from './components/ConverterContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header >
       <p className='text-lg text-green-400'>Convert 1 Euro to Canadian Dollar- EUD to CA$</p> 
      </header>
      <ConverterContainer/>
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todo from './components/Todo'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Todos from './components/Todos'
import Index from './components/Index'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/todos' element={<Todos/>}/>
        <Route path='/todos/new' element={<Todo/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

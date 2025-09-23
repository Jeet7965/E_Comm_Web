import { useState } from 'react'


import Navbar from './Componnents/Hearder'
import Cart from './Componnents/Cart'
import { Route, Routes } from 'react-router-dom'
import CartList from './Componnents/CartList'


function App() {
  const [count, setCount] = useState(0)

  return (
  <>
  <Navbar></Navbar>

  <Routes>

    <Route path='/' element={ <Cart></Cart>}></Route> 
    <Route path='/cartlist' element={<CartList></CartList>}></Route> 
   
  </Routes>
 
 
  </>
  )
}

export default App

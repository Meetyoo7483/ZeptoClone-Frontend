import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Nevigation from './Componet/common/Nevigation'
import { Route, Routes } from 'react-router-dom'
import Home from './Componet/page/Home/Home'
import Profile from './Componet/page/Home/Profile';
import Order from './Componet/page/Order';
import CategoryPage from './Componet/page/CategoryPage';
import { Toaster } from 'react-hot-toast';
import ProductDetail from './Componet/page/ProductDetail';




function App() {
  return (
    <>
    {/* <ToastContainer /> */}
    <Toaster position='top-right' reverseOrder={false} />
      <Nevigation>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/profile'} element={<Profile />} />
          {/* <Route path={'/Login'} element={<Login />} /> */}
          {/* <Route path={'/Otp'} element={<Otp />} /> */}
          <Route path={'/Order'} element={<Order />} />
          <Route path="/category/:id" element={<CategoryPage />} />
           <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
      </Nevigation>
    </>
  )
}

export default App
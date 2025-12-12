import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import BaseUrl from '../service/BaseUrl'
import CategorypageProps from '../CategoryPageProps/CategorypageProps'

const CategoryPage = () => {
  const { id } = useParams() 
  const [products, setProducts] = useState([])

  console.log(id);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/user/master/product/${id}`)
        if (res.data.success) {
          setProducts(res.data.data)
        }
      } catch (err) {
        console.error(err.message)
      }
    }
    fetchProducts()
  }, [id])

  console.log(products);
  

  return (
    // <div className='max-w-[1200px] mx-auto p-5'>
    //   <h1 className='text-2xl font-bold mb-4'>Category Products</h1>
    //   <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5'>
    //     {products.map((p, i) => (
    //       <div key={i} className='p-3 border rounded-lg shadow bg-white'>
    //         <img src={`${BaseUrl}/${p.image}`} alt={p.name} className='w-full h-32 object-cover rounded-md' />
    //         <h2 className='mt-2 text-lg font-semibold'>{p.name}</h2>
    //         <p className='text-gray-500'>₹{p.price}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <>
      <CategorypageProps data={products}/>
    </>
  )
}

export default CategoryPage
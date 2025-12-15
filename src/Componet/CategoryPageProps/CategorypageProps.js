import React from 'react'
import BaseUrl from '../service/BaseUrl'
import { addToCart } from '../util/cartUtils';
import { useNavigate } from 'react-router-dom';

const CategorypageProps = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 px-2">
      {data.map((item, index) => (
        <div
          key={index}
          className="p-2 cursor-pointer"
          onClick={() => navigate(`/product/${item._id}`)}
        >
          <div className="h-[330px] relative shadow-md bg-white py-3 px-2 rounded-md hover:shadow-lg transition-shadow">
            <img
              src={`${BaseUrl}/${item?.product_Image}`}
              className="h-[158px] w-[158px] mx-auto rounded-md hover:scale-105 ease-in-out transition-all shadow-md"
              alt={item.product_Name || 'product'}
            />
            <p className="truncate text-[15px] py-1 h-[50px]">{item.product_Name}</p>
            <p className="text-[#586274] text-[13px] py-1 line-clamp-2">{item.product_description}</p>
            <div className="flex justify-between items-center">
              <div>
                <p className="py-1 font-semibold">₹{item.product_price}</p>
                <span className="line-through text-[14px] text-gray-400">
                  ₹{item.product_discount_price}
                </span>
              </div>
              <button
                onClick={() => {
                  addToCart({
                    id: item._id,                     // Or appropriate unique id
                    name: item.product_Name,          // Adapt field names
                    price: item.product_price,                // Provide all required product fields
                    image: item.product_Image
                  });
                  // Optionally, trigger a state change or notification
                }}
                className='outline outline-[#EF4372] hover:bg-[#EF4372] hover:text-white outline-1 rounded-md p-2 px-4 text-[#EF4372] flex items-center gap-2'
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CategorypageProps

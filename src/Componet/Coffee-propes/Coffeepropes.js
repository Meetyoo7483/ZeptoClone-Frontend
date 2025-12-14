import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Offertag from '../assets/offer-tag.svg'
import { FaRegBell } from 'react-icons/fa';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { GoChevronRight } from 'react-icons/go';
import BaseUrl from '../service/BaseUrl';


const Coffeepropes = ({ data, bgcolour, title, titlecolor, description, btncolor }) => {
  const NextArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 right-[10px] transform -translate-y-1/2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer z-10"
      onClick={onClick}
    >
      <MdOutlineKeyboardArrowRight />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 left-[10px] transform -translate-y-1/2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer z-10"
      onClick={onClick}
    >
      <MdOutlineKeyboardArrowLeft />
    </div>
  );

  const coffeecarousl = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 766,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,   // only 1 slide per view on small screens
          slidesToScroll: 1,
          infinite: false,
          arrows: false      // optional: hide arrows on mobile
        }
      }
    ]
  }
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-4 h-full w-full p-3 md:p-10 space-y-10 sm:space-y-0 rounded-md ' style={{ backgroundColor: bgcolour }} >
        <div className='h-[252px] w-[272px] font-uifontfamily flex flex-col gap-4'>
          <p className='tracking-[5px]' style={{ color: titlecolor }} >{title}</p>
          <p className='font-semibold text-[35px]' style={{ color: titlecolor }} >{description}</p>
          <div>
            <button type='button' className='text-white font-semibold flex items-center gap-2 text-[19px] rounded-2xl py-4 px-10' style={{ backgroundColor: btncolor, color: 'rgb(255, 241, 236)' }} >More Items<GoChevronRight /></button>
          </div>
        </div>
        <div className='col-span-3 sm:px-10'>
          <Slider {...coffeecarousl}>
            {data.map((item, index) => (
              <div key={index} className=' p-2'>
                <div className='h-[330px] w-[170px] relative shadow-md  bg-white py-3 px-2 m-2 rounded-md'>
                  {/* <img src={Offertag} className='h-[37px] z-50 absolute' /> */}
                  <img src={`${BaseUrl}/${item?.product_Image}`} className='h-[158px] w-[158px]-mt-[50px] rounded-md hover:scale-105 ease-in-out transition-all' />
                  {/* <p className='-mt-[155px] ml-2 z-50  absolute text-white text-[10px]'>{item.discount}<br />off</p> */}
                  <p className='text-nowrapwrap py-1 h-[50px]'>{item.product_Name}</p>
                  <p className='text-[#586274] py-1 text-[13px] line-clamp-2'>{item.product_description}</p>
                  <div className='flex justify-between items-center'>
                    <div>
                      <p className='py-1 font-semibold'>₹{item.product_discount_price}</p>
                      <span className='line-through text-[14px] text-gray-400'>₹{item.product_price}</span>
                    </div>
                    <button type='button' className='outline outline-[#EF4372] outline-1 rounded-md p-2 text-[#EF4372] flex items-center gap-2'><FaRegBell /> Notify</button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  )
}

export default Coffeepropes
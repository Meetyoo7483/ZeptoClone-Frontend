import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Offertag from '../assets/offer-tag.svg'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import BaseUrl from '../service/BaseUrl';
import { addToCart } from '../util/cartUtils';
import toast from 'react-hot-toast';

const Noiseprops = ({ data }) => {



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
    const Noisecarousl = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 5,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
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
            <div>
                <div>
                    <Slider {...Noisecarousl}>
                        {data.map((item, index) => (
                            <div key={index} className=' p-2'>
                                <div className='h-[330px] w-[160px] relative shadow-md  bg-white py-3 px-2 rounded-md'>
                                    {/* <img src={Offertag} className='h-[37px] z-50 absolute' /> */}
                                    <img src={`${BaseUrl}/${item?.product_Image}`} className='h-[158px] w-[158px]-mt-[50px] rounded-md hover:scale-105 ease-in-out transition-all shadow-md' />
                                    {/* <p className='-mt-[155px] ml-2 z-50  absolute text-white text-[10px]'>{item.discount}<br />off</p> */}
                                    <p className='truncate text-[15px] py-1 h-[50px]'>{item.product_Name}</p>
                                    <p className='text-[#586274] text-[13px] py-1 line-clamp-2'>{item.product_description}</p>
                                    <div className='flex justify-between items-center'>
                                        <div>
                                            <p className='py-1 font-semibold'>₹{item.product_price}</p>
                                            <span className='line-through text-[14px] text-gray-400'>₹{item.product_discount_price}</span>
                                        </div>
                                        {/* // In your product map */}
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

                                        {/* <button type='button' className='outline outline-[#EF4372] outline-1 rounded-md p-2 px-4 text-[#EF4372] flex items-center gap-2'>Add</button> */}
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

export default Noiseprops
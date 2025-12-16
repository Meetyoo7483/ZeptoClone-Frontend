import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Paancorner1 from '../../assets/Paancorner1.png'
import Supersonic from '../../assets/Supersonic.png'
import ChargingNeeds1 from '../../assets/ChargingNeeds1.png'
import ChargingNeeds2 from '../../assets/ChargingNeeds2.png'
import ChargingNeeds3 from '../../assets/ChargingNeeds3.png'
import ChargingNeeds4 from '../../assets/ChargingNeeds4.png'
import ChargingNeeds5 from '../../assets/ChargingNeeds5.png'
import ChargingNeeds6 from '../../assets/ChargingNeeds6.png'
import BeautyLIT from '../../assets/BeautyLIT.png'
import BeautyLITimg1 from '../../assets/BeautyLIT-img1.png'
import BeautyLITimg2 from '../../assets/BeautyLIT-img2.png'
import BeautyLITimg3 from '../../assets/BeautyLIT-img3.png'
import BeautyLITimg4 from '../../assets/BeautyLIT-img4.png'
import BeautyLITimg5 from '../../assets/BeautyLIT-img5.png'
import BeautyLITimg6 from '../../assets/BeautyLIT-img6.png'
import Card1 from '../../assets/Card1.png'
import Card2 from '../../assets/Card2.png'
import Card3 from '../../assets/Card3.png'
import Card4 from '../../assets/Card4.png'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { GoChevronRight } from 'react-icons/go';
import Coffeepropes from '../../Coffee-propes/Coffeepropes';
import Noiseprops from '../../Noisepropes/Noiseprops';
import TypeC from '../../assets/Typeccable.png'
import Grocerypropes from '../../Grocerykitchanprpes/Grocerypropes';
import PuffPropes from '../../PuffPropes/PuffPropes';
import samosa from '../../assets/Samosa.png'
import { PiCookingPotBold } from 'react-icons/pi';
import axios from 'axios';
import BaseUrl from '../../service/BaseUrl';
import { useNavigate } from 'react-router-dom';


const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-[12px] transform -translate-y-1/2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer z-10"
    onClick={onClick}
  >
    <MdOutlineKeyboardArrowRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-[0px] transform -translate-y-1/2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer z-10"
    onClick={onClick}
  >
    <MdOutlineKeyboardArrowLeft />
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  const [productcategory, setproductcategory] = useState([])

  const [imgsettings, setimgsettings] = useState([
    ChargingNeeds1,
    ChargingNeeds2,
    ChargingNeeds3,
    ChargingNeeds4,
    ChargingNeeds5,
    ChargingNeeds6
  ])

  const [beautyLIT, setbeautyLIT] = useState([
    BeautyLITimg1,
    BeautyLITimg2,
    BeautyLITimg3,
    BeautyLITimg4,
    BeautyLITimg5,
    BeautyLITimg6,
  ])

  const [cardimg, setcardimg] = useState([
    Card1,
    Card2,
    Card3,
    Card4
  ])
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 10,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
    ]
  };
  const Imgsettings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
    ]
  };
  const Cardsettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: 0,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };
  const Sabjisettings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 5,
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
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  }

  const [CoffeeProduct, setCoffeeProduct] = useState([])
  const [CoffeeProductitledes, setCoffeeProductitledes] = useState([])


  const [noiseproducts, setnoiseproducts] = useState([]);

  const [mobileaccessories, setmobileaccessories] = useState([
    {
      img: TypeC,
      title: 'Mobile Accessories'
    },
    {
      img: TypeC,
      title: 'Mobile Accessories'
    },
    {
      img: TypeC,
      title: 'Mobile Accessories'
    },
    {
      img: TypeC,
      title: 'Mobile Accessories'
    },
    {
      img: TypeC,
      title: 'Mobile Accessories'
    },
    {
      img: TypeC,
      title: 'Mobile Accessories'
    },
    {
      img: TypeC,
      title: 'Mobile Accessories'
    },
    {
      img: TypeC,
      title: 'Mobile Accessories'
    },
    {
      img: TypeC,
      title: 'Mobile Accessories'
    },
    {
      img: TypeC,
      title: 'Mobile Accessories'
    },
    {
      img: TypeC,
      title: 'Mobile Accessories'
    },
    {
      img: TypeC,
      title: 'Mobile Accessories'
    },
    {
      img: TypeC,
      title: 'Mobile Accessories'
    }
  ])

  const [sabji, setsabji] = useState([])

  const [hairbeautyprod, sethairbeautyprod] = useState([]);

  const [powerbank, setpowerbank] = useState([]);

  const [egg, setegg] = useState([])

  const [snacks, setsnacks] = useState([]);

  const [toys, settoys] = useState([]);

  const [house, sethouse] = useState([]);

  const [recipes, setrecipes] = useState([
    {
      name: "Dal Makhani",
      image: samosa,
      time: "90 mins",
      type: "Lunch",
    },
    {
      name: "Samosa",
      image: samosa,
      time: "45 mins",
      type: "Snacks",
    },
    {
      name: "Vegetable Pulao",
      image: samosa,
      time: "45 mins",
      type: "Lunch",
    },
    {
      name: "Fish Curry",
      image: samosa,
      time: "30 mins",
      type: "Lunch",
    },
    {
      name: "Gulab Jamun",
      image: samosa,
      time: "45 mins",
      type: "Dessert",
    },
    {
      name: "Paneer Butter Masala",
      image: samosa,
      time: "50 mins",
      type: "Lunch",
    },
    {
      name: "Chicken Biryani",
      image: samosa,
      time: "60 mins",
      type: "Lunch",
    },
    {
      name: "Rasgulla",
      image: samosa,
      time: "30 mins",
      type: "Dessert",
    },
    {
      name: "Chole Bhature",
      image: samosa,
      time: "40 mins",
      type: "Lunch",
    },
    {
      name: "Egg Curry",
      image: samosa,
      time: "35 mins",
      type: "Lunch",
    },
  ]);

  const [noisecopy, setnoisecopy] = useState([]);

  const fetchProductCategory = async () => {
    try {
      console.log(BaseUrl);
      const result = await axios.get(`${BaseUrl}/user/get/Product`)
      if (result?.data?.success) {
        setproductcategory(result?.data?.data)
      }
    } catch (error) {
      return console.log(error.message);

    }
  }
  const fetchProductCategoryCoffee = async () => {
    try {
      const result = await axios.get(`${BaseUrl}/user/get/Product/cofeee`)
      if (result?.data?.success) {
        setCoffeeProduct(result?.data?.data)
      }
    } catch (error) {
      return console.log(error.message);

    }
  }
  const fetchProductCategorySabji = async () => {
    try {
      const result = await axios.get(`${BaseUrl}/user/get/Product/sabjii`)
      if (result?.data?.success) {
        setsabji(result?.data?.data)
      }
    } catch (error) {
      return console.log(error.message);

    }
  }

  //Fashion
  const fetchProductCategoryFashion = async () => {
    try {
      const result = await axios.get(`${BaseUrl}/user/get/Product/Fashion`)
      if (result?.data?.success) {
        setnoiseproducts(result?.data?.data)
      }
    } catch (error) {
      return console.log(error.message);

    }
  }

  // mobile
  const fetchProductCategoryMobile = async () => {
    try {
      const result = await axios.get(`${BaseUrl}/user/get/Product/Mobile`)
      if (result?.data?.success) {
        setpowerbank(result?.data?.data)
      }
    } catch (error) {
      return console.log(error.message);

    }
  }

  // Beauty
  const fetchUserProductCategoryBeauty = async () => {
    try {
      const result = await axios.get(`${BaseUrl}/user/get/Product/Beauty`)
      if (result?.data?.success) {
        sethairbeautyprod(result?.data?.data)
      }
    } catch (error) {
      return console.log(error.message);

    }
  }

  // Frash
  const fetchUserProductCategoryFrash = async () => {
    try {
      const result = await axios.get(`${BaseUrl}/user/get/Product/Frash`)
      if (result?.data?.success) {
        setegg(result?.data?.data)
      }
    } catch (error) {
      return console.log(error.message);

    }
  }

  // Cafe
  const fetchUserProductCategoryCafe = async () => {
    try {
      const result = await axios.get(`${BaseUrl}/user/get/Product/Cafe`)
      if (result?.data?.success) {
        setsnacks(result?.data?.data)
      }
    } catch (error) {
      return console.log(error.message);

    }
  }

  // Toys
  const fetchUserProductCategoryToys = async () => {
    try {
      const result = await axios.get(`${BaseUrl}/user/get/Product/Toys`)
      if (result?.data?.success) {
        settoys(result?.data?.data)
      }
    } catch (error) {
      return console.log(error.message);

    }
  }

  // Home
  const fetchUserProductCategoryHome = async () => {
    try {
      const result = await axios.get(`${BaseUrl}/user/get/Product/Home`)
      if (result?.data?.success) {
        sethouse(result?.data?.data)
      }
    } catch (error) {
      return console.log(error.message);

    }
  }

  // Electronics
  const fetchUserProductCategoryElectronics = async () => {
    try {
      const result = await axios.get(`${BaseUrl}/user/get/Product/Electronics`)
      if (result?.data?.success) {
        setnoisecopy(result?.data?.data)
      }
    } catch (error) {
      return console.log(error.message);

    }
  }

  // FoodCarosarl
  const fetchUserProductCategoryFoodCarosarl = async () => {
    try {
      const result = await axios.get(`${BaseUrl}/user/get/Product/FoodCarosarl`)
      if (result?.data?.success) {
        setCoffeeProductitledes(result?.data?.data)
      }
    } catch (error) {
      return console.log(error.message);

    }
  }
  useEffect(() => {
    fetchProductCategory()
    fetchProductCategoryCoffee()
    fetchProductCategorySabji()
    fetchProductCategoryFashion()
    fetchProductCategoryMobile()
    fetchUserProductCategoryBeauty()
    fetchUserProductCategoryFrash()
    fetchUserProductCategoryCafe()
    fetchUserProductCategoryToys()
    fetchUserProductCategoryHome()
    fetchUserProductCategoryElectronics()
    fetchUserProductCategoryFoodCarosarl()
  }, [])
  // console.log(fetchUserProductCategoryFoodCarosarl);

  return (
    <>
      <div className="my-8 mx-4">
        <Slider {...settings}>
          {/* {productcategory.map((item, index) => (
            <div key={index} className='w-[100px] h-[100px]'>
              <img src={`${BaseUrl}/${item?.product_Image}`} className='w-[80px] h-[80px] mx-auto' />
              <h1 className='font-semibold font-uifontfamily text-center text-[14px]'>{item?.product_Name}</h1>
            </div>
          ))} */}
          {productcategory.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/product/${item._id}`)}
              className='w-[100px] h-[100px] cursor-pointer'
            >
              <img src={`${BaseUrl}/${item?.product_Image}`} alt={item?.product_Name} className='w-[80px] h-[80px] mx-auto' />
              <h1 className='font-semibold font-uifontfamily text-center text-[14px]'>{item?.product_Name}</h1>
            </div>
          ))}
        </Slider>
      </div>


      <div className='grid grid-cols-1 sm:grid-cols-2 px-3 space-y-4 sm:space-y-4 sm:space-x-4'>
        <div className='col-span-1 sm:col-span-2'>
          <img src={Paancorner1} alt="Paan corner banner" className='w-full h-[183px]' />
        </div>

        <div className='hover:cursor-pointer' onClick={() => navigate('/category/68afe6c08f87c75b3b5310cd')}>
            <div>
              <img src={Supersonic} alt="Supersonic banner" className='cursor-pointer' />
            </div>
            <div className='bg-black px-6 py-6 rounded-bl-[20px] rounded-br-[20px]'>
              <Slider {...Imgsettings} >
                {imgsettings.map((item, index) => (
                  <div key={index} className='cursor-pointer'>
                    <img src={item} alt="Product item" className='w-[100px] h-[120px]' />
                  </div>
                ))}
              </Slider>
            </div>
        </div>

        <div>
          <div>
            <img src={BeautyLIT} />
          </div>
          <div className='bg-[rgb(247,194,194)] px-6 py-6 rounded-bl-[20px] rounded-br-[20px]'>
            <Slider {...Imgsettings} >
              {beautyLIT.map((item, index) => (
                <a href='#' key={index}>
                  <img src={item} className='w-[100px] h-[120px]' />
                </a>
              ))}
            </Slider>
          </div>
        </div>
      </div>


      <div className='my-5 px-4 overflow-hidden '>
        <Slider {...Cardsettings} >
          {cardimg.map((item, index) => (
            <a href='#' className='px-2' key={index} >
              <img src={item} className='w-full h-auto object-cover rounded-lg' />
            </a>
          ))}
        </Slider>
      </div>


      <Coffeepropes title={CoffeeProductitledes[0]?.Coffee_title} titlecolor={'rgb(153,101,55)'} bgcolour={'rgb(255, 241, 236)'} description={CoffeeProductitledes[0]?.Coffee_description} btncolor={'rgb(153,101,55)'} data={CoffeeProduct} />

      <div className='flex flex-row justify-between items-center font-uifontfamily px-3 py-5 tracking-wide'>
        <h4 className='font-semibold'>Elevate Yourself</h4>
        <button type='button' className='text-[#EF4372] flex  items-center gap-1 ' >See All <GoChevronRight /></button>
      </div>

      <Noiseprops data={noiseproducts} />

      <div className='p-5 rounded-md flex items-center justify-around max-md:flex-col  sm:gap-[30px]' style={{ backgroundColor: 'rgb(242,255,239)' }} >
        <div className='h-[252px] w-[272px] p-3 font-uifontfamily '>
          <p className='tracking-[5px]' style={{ color: 'rgb(139,167,160)' }} >LOVE TO MORE</p>
          <p className='font-semibold text-[30px]' style={{ color: 'rgb(27,87,84)' }} >Explore more & uncover hidden gems</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2">
          {mobileaccessories.map((item, index) => (
            <div key={index} className="font-uifontfamily text-center">
              <img src={item.img} className="w-[80px] h-[70px] mx-auto" alt={item.title} />
              <p className="text-[13px]">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <Noiseprops data={powerbank} />

      <Coffeepropes title={CoffeeProductitledes[1]?.Coffee_title} titlecolor={'rgb(108, 29, 153)'} bgcolour={'rgb(255, 241, 236)'} description={CoffeeProductitledes[1]?.Coffee_description} btncolor={'rgb(108, 29, 153)'} data={toys} />

      <Noiseprops data={hairbeautyprod} />

      <div className='flex flex-row  font-uifontfamily px-3 py-5 tracking-wide'>
        <h4 className='font-semibold'>Grocery & Kitchan</h4>
      </div>

      <Grocerypropes data={egg} />

      <div className='flex flex-row  font-uifontfamily px-3 py-5 tracking-wide'>
        <h4 className='font-semibold'>Snacks & Drinks</h4>
      </div>

      <PuffPropes data={snacks} />

      <div className='flex flex-row  font-uifontfamily px-3 py-5 tracking-wide'>
        <h4 className='font-semibold'>Toys</h4>
      </div>

      <Grocerypropes data={toys} />

      <div className='flex flex-row  font-uifontfamily px-3 py-5 tracking-wide'>
        <h4 className='font-semibold'>Household Essentials</h4>
      </div>

      <PuffPropes data={house} />

      <div className='flex flex-row justify-between items-center font-uifontfamily px-3 py-5 tracking-wide'>
        <h4 className='font-semibold'>Recipe Ideas</h4>
        <button type='button' className='text-[#EF4372] flex  items-center gap-1 ' >Explore All Recipe<GoChevronRight /></button>
      </div>

      <div className='col-span-3 px-2'>
        <Slider {...Sabjisettings}>
          {recipes.map((item, index) => (
            <div key={index} >
              <img src={item.image} className='h-[200px] sm:h-[236px] w-[180px] sm:w-[236px] rounded-lg  ' />
              <div className="absolute flex items-center z-10">
                <svg width="20" height="20" viewBox="0 0 24 24" className="mt-[-25px] ml-1">
                  <rect x="1" y="1" width="20" height="20" rx="4" fill="none" stroke="green" strokeWidth="2" />
                  <circle cx="11" cy="11" r="5" fill="green" />
                </svg>
                <span className="rounded bg-gray-100 text-gray-500 text-[8px] leading-5 h-[20px] mt-[-26px] ml-1 w-10 flex items-center justify-center"> {item.type}</span>
              </div>
              <p>{item.name}</p>
              <span className='flex items-center gap-1 text-[13px] '><PiCookingPotBold />{item.time}</span>
            </div>
          ))}
        </Slider>
      </div>

      <div className='flex flex-row justify-between items-center font-uifontfamily px-3 py-5 tracking-wide'>
        <h4 className='font-semibold'>Electronics</h4>
        <button type='button' className='text-[#EF4372] flex  items-center gap-1 ' >See All <GoChevronRight /></button>
      </div>

      <Noiseprops data={noisecopy} />
    </>
  )
}

export default Home

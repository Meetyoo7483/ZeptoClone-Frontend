import React, { useEffect, useState } from 'react'
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom'
import Zepimg from '../assets/Zepto.png'
import { IoMenu, IoSearchOutline } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Zeptoredlogo from '../assets/logozeptored.svg'
import { SiInstagram } from 'react-icons/si'
import { FaAngleLeft, FaFacebook, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import playstorezepto from '../assets/play-storezepto.svg'
import appstorelogoxepto from '../assets/app-storelogozepto.svg'
import Login from '../Loginpopup/Login'
import BaseUrl from '../service/BaseUrl'
import Cartpower from '../assets/Cartpower.png'
import Carttime from '../assets/Carttime.png'
import Cartimg from '../assets/Cartimg.png'
import { FiMinus, FiPlus } from 'react-icons/fi';
import { MdPedalBike } from 'react-icons/md'
import axios from 'axios'
import { getCart, removeFromCart, updateQuantity } from '../util/cartUtils'
import toast from 'react-hot-toast'

function Nevigation({ children }) {
  const [isOpen, setisOpen] = useState(false)
  const [islogin, setislogin] = useState(false)
  const [chnage, setchage] = useState(0)
  const [isSlider, setisSlider] = useState(false)
  const [Categories, setCategories] = useState([])


  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    if (isSlider) {
      setCartItems(getCart());
    }
  }, [isSlider, chnage]); // Optionally add more dependencies if needed

  // Example handlers
  const handleQtyPlus = (id) => {
    updateQuantity(id, getCart().find(item => item.id === id).quantity + 1);
    setCartItems(getCart());
  };
  const handleQtyMinus = (id) => {
    updateQuantity(id, getCart().find(item => item.id === id).quantity - 1);
    setCartItems(getCart());
  };



  const cartTotal = cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);


  const navigate = useNavigate()

  const fetchCategory = async () => {
    try {
      const result = await axios.get(`${BaseUrl}/user/get/catagory`)

      if (result?.data?.success) {
        setCategories(result?.data?.data)
      }
    } catch (error) {
      return console.log(error.message)
    }
  }
  const handleCheckout = async () => {
    try {
      const userId = localStorage.getItem('userId');  // or however you track user
      const name = localStorage.getItem('user_name')
      const address = localStorage.getItem('addressData')
      const email = localStorage.getItem('email')
      const addressObj = JSON.parse(address);
      const pincode = addressObj.pincode;
      // console.log(pincode);
      localStorage.setItem('pincode', pincode);



      const body = {
        userId,
        name,
        address,
        email,
        pincode,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total: cartTotal,
        // optionally address, timestamp, etc.

      };

      const res = await axios.post(`${BaseUrl}/user/add/order`, body);
      console.log("Order API response:", res.data);

      if (res.data.success) {
        // maybe navigate to order confirmation
        // navigate('/order-confirmation');
        toast.success("order done")
      } else {
        toast.error("Failed to place order");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Checkout failed");
    }
  };

  useEffect(() => {
    fetchCategory()
  }, [])

  return (
    <>
      <div className='max-w-[1456px] mx-auto'>

        <div className='sticky top-0 z-50 shadow-lg'>

          <nav style={{ background: 'linear-gradient(rgb(236,220,255), rgb(255,255,255))' }} className='flex items-center justify-between w-full h-[91px] px-5 lg:px-20 z-0'>
            <div className='w-[90px] h-[30px]'>
              <img src={Zepimg} />
            </div>
            <div className='-translate-x-20 sm:translate-x-0'>
              <label className="inline-flex items-center me-5 cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600" />
              </label>
            </div>
            <div className='hidden sm:block sm:w-[400px] lg:w-[718px] h-[46px] bg-white rounded-md shadow relative'>
              <IoSearchOutline className='text-[25px] absolute top-3 left-2' />
              <input type='text' placeholder='Search for "amul butter"' className='w-full h-full rounded-md pl-10 focus:outline-none placeholder:text-black font-uifontfamily placeholder:font-uifontfamily' />
            </div>
            {/* <div onClick={() => navigate('/Order')} className='hidden sm:block hover:cursor-pointer'>
              <MdPedalBike className='text-[25px] mx-auto' />
              <h2 className='font-uifontfamily text-center'>Rider</h2>
            </div> */}
            <div onClick={() => setislogin(true)} className='hidden sm:block hover:cursor-pointer'>
              <CgProfile className='text-[25px] mx-auto' />
              <h2 className='font-uifontfamily text-center'>Profile</h2>
            </div>
            <div
              onClick={() => setisSlider(true)}
              className="hidden sm:flex flex-col items-center relative hover:cursor-pointer"
            >
              <div className="relative">
                <AiOutlineShoppingCart className="text-[25px]" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
                  {getCart().reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <h2 className="font-uifontfamily text-center">Cart</h2>
            </div>



            <div className='block sm:hidden'>
              <IoMenu className='text-[25px]' onClick={() => setisOpen(true)} />
            </div>
          </nav>

          <div className='block sm:hidden w-full h-[46px] bg-white rounded-md shadow relative'>
            <IoSearchOutline className='text-[25px] absolute top-3 left-2' />
            <input type='text' placeholder='Search for "amul butter"' className='w-full h-full rounded-md pl-10 focus:outline-none placeholder:text-black font-uifontfamily placeholder:font-uifontfamily ' />
          </div>

          {isOpen && (
            <div
              onClick={() => setisOpen(false)}
              className="fixed inset-0 bg-black/50 w-full h-screen z-40"
            ></div>
          )}

          <div style={{ background: 'linear-gradient(rgb(236,220,255), rgb(255,255,255))' }} className={`absolute top-0 left-0 bg-white w-[350px] h-screen transition-all duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} p-5`}>

            <img src={Zepimg} className='w-[250px] h-[100px]' />

            <div onClick={() => setislogin(true)} className='flex items-center gap-2 w-full mt-10 hover:cursor-pointer'>
              <CgProfile className='text-[35px]' />
              <h2 className='font-uifontfamily text-[30px] text-center'>Profile</h2>
            </div>

            <div onClick={() => setisSlider(true)} className='flex items-center gap-2 w-full pt-5'>
              <AiOutlineShoppingCart className='text-[35px]' />
              <h2 className='font-uifontfamily text-center text-[30px]'>Cart</h2>
            </div>

            <div onClick={() => navigate('/Order')} className='flex items-center gap-2 w-full pt-5'>
              <MdPedalBike className='text-[35px]' />
              <h2 className='font-uifontfamily text-center text-[30px]'>Rider</h2>
            </div>
          </div>



          {/* <div className='flex space-x-6 gap-2 pl-3 lg:pl-10 sm:pl-5  overflow-x-auto bg-white'>
            {Categories.map((item, index) => (
              <div key={index} className='relative '>
                <Link to={`/category/${item?._id}`} className={`flex gap-1 pb-2 ${chnage === index ? 'navunderlink' : ''}`} onClick={() => setchage(index)}>
                  <img src={`${BaseUrl}/${item?.category_Image}`} className='h-[24px] w-[24px]' />
                  <span className={chnage === index ? 'text-[#9A16CA]' : 'text-[#586274]'}>
                    {item?.category_Name}
                  </span>
                </Link>
              </div>
            ))}
          </div> */}

          <div className='flex space-x-6 gap-2 pl-3 lg:pl-10 sm:pl-5 overflow-x-auto bg-white'>
            {Categories.map((item, index) => (
              <div key={index} className='relative'>
                <Link
                  to={item?.category_Name === 'All' ? '/' : `/category/${item?._id}`}
                  className={`flex gap-1 pb-2 cursor-pointer ${chnage === index ? 'text-[#9A16CA]' : 'text-[#586274]'}`}
                  onClick={() => setchage(index)}
                >
                  <img
                    src={`${BaseUrl}/${item?.category_Image}`}
                    className='h-[24px] w-[24px]'
                    alt={item?.category_Name}
                  />
                  <span>{item?.category_Name}</span>
                </Link>
                {/* Underline span */}
                <span
                  className={`
          absolute left-0 bottom-0 h-[2px] bg-[#9A16CA]
          transition-all duration-300 ease-in-out
          ${chnage === index ? 'w-full' : 'w-0'}
        `}
                />
              </div>
            ))}
          </div>

        </div>
        {/* // ...inside your Nevigation component */}
        {isSlider && (
          <div
            className={`
      fixed top-0 right-0 h-full
      w-full sm:w-[350px]
      bg-[#f0f4f9] shadow-lg z-50
      transition-transform duration-300
      ${isSlider ? 'translate-x-0' : 'translate-x-full'}
    `}
          >
            <div className="bg-white w-full h-full flex flex-col">
              {/* Header */}
              <div className="p-2 shadow-2xl rounded-b-2xl bg-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaAngleLeft size={20} onClick={() => setisSlider(false)} className='hover:cursor-pointer' />
                    <p>Your Cart</p>
                  </div>
                  <label className="inline-flex items-center me-5 cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked readOnly />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:bg-green-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                  </label>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <img src={Cartpower} alt="Cart power" className="h-[25px] w-[25px] rounded-full" />
                  <p className="text-[13px]">
                    Shop for ₹3 more to save ₹25 on delivery fee
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="m-2 bg-slate-100 p-2 flex-grow overflow-auto">
                {/* Delivery Time */}
                <div className="flex items-center gap-2">
                  <img src={Carttime} alt="Delivery time" className="h-[30px] w-[30px]" />
                  <p className="text-[15px] font-bold">Delivery in 6 mins</p>
                </div>
                {/* Cart Items */}
                {cartItems.length === 0 ? (
                  <div className="p-4 text-gray-500">Your cart is empty</div>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} className="mt-4 flex items-center gap-2">
                      <img
                        src={item.image.includes('http') ? item.image : `${BaseUrl}/${item.image}`}
                        alt={item.name}
                        className="h-[45px] w-[45px] border rounded-lg"
                      />
                      <div className="flex-grow">
                        <p className="text-[12px] tracking-wide">{item.name}</p>
                      </div>
                      <div className="border-pink-100 border flex items-center py-1 w-[70px] justify-between rounded-md bg-[rgb(255,247,250)]">
                        <button type="button" onClick={() => handleQtyMinus(item.id)}>
                          <FiMinus color="rgb(236 72 153)" size={16} />
                        </button>
                        <p className="text-[14px]">{item.quantity}</p>
                        <button type="button" onClick={() => handleQtyPlus(item.id)}>
                          <FiPlus color="rgb(236 72 153)" size={16} />
                        </button>
                      </div>
                      <p className="text-[14px] pl-2">₹{item.price}</p>
                      {/* <button onClick={() => handleRemove(item.id)} className="ml-2 text-xs text-red-500">Remove</button> */}
                    </div>
                  ))
                )}

                <hr className="my-4 border-gray-300" />

                {/* Add More */}
                <div className="flex justify-between items-center">
                  <p className="text-[13px]">Missed Something?</p>
                  <button className="bg-black text-white flex gap-2 items-center text-[13px] p-1 rounded-lg" onClick={() => setisSlider(false)}>
                    <FiPlus color="white" /> Add More Items
                  </button>
                </div>
              </div>

              {/* aa show nahi thatuu */}
              {cartItems.length < 0 && (
                <div className="p-4 border-t flex flex-col gap-2">
                  <button
                    className="bg-pink-600 text-white w-full mt-2 py-2 rounded-md text-lg"
                  >
                    Add More Items
                  </button>
                </div>
              )}

              {/* Total and Checkout */}
              {cartItems.length > 0 && (
                <div className="p-4 border-t flex flex-col gap-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>
                      ₹{cartTotal}
                    </span>
                  </div>
                  <button
                    className="bg-pink-600 text-white w-full mt-2 py-2 rounded-md text-lg"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}




        {children}


        <div className='font-uifontfamily m-2'>
          <div>
            <h3 className='font-bold'>Popular Searches</h3>
          </div>
          <br />
          <div>
            <div className='flex gap-2'>
              <div>
                <h4 className='font-bold'>Products: </h4>
              </div>
              <div>
                <ul className='flex gap-2 text-[#2B1E35BF] text-[15px] flex-wrap'>
                  <li><a href='#'>Avacado | </a></li>
                  <li><a href='#'>Strawberry | </a></li>
                  <li><a href='#'>Pomegranate Small | </a></li>
                  <li><a href='#'>Beetroot | </a></li>
                  <li><a href='#'>Ash Gourd | </a></li>
                  <li><a href='#'>Bottle Gourd | </a></li>
                  <li><a href='#'>Lady Finger | </a></li>
                  <li><a href='#'>Potato | </a></li>
                  <li><a href='#'>Lemon | </a></li>
                  <li><a href='#'>Dalchini | </a></li>
                  <li><a href='#'>Fennel Seeds | </a></li>
                  <li><a href='#'>Blueberry | </a></li>
                  <li><a href='#'>Papaya | </a></li>
                  <li><a href='#'>Dragon Fruit  </a></li>
                </ul>
              </div>
            </div>

            <br />

            <div className='flex gap-2'>
              <div>
                <h4 className='font-bold'>Brands: </h4>
              </div>
              <div>
                <ul className='flex gap-2 text-[#2B1E35BF] text-[15px] flex-wrap'>
                  <li><a href='#'>Yakult | </a></li>
                  <li><a href='#'>My Muse | </a></li>
                  <li><a href='#'>Aashirvaad Atta | </a></li>
                  <li><a href='#'>Too yumm | </a></li>
                  <li><a href='#'>Lays | </a></li>
                  <li><a href='#'>Figaro Olive Oil | </a></li>
                  <li><a href='#'>Nandini Milk | </a></li>
                  <li><a href='#'>Amul | </a></li>
                  <li><a href='#'>Mother dairy near me | </a></li>
                  <li><a href='#'>Fortune Oil | </a></li>
                  <li><a href='#'>Superyou | </a></li>
                  <li><a href='#'>Durex Condoms | </a></li>
                  {/* <li><a href='#'>Ferns and Petals </a></li> */}
                </ul>
              </div>
            </div>

            <br />

            <div className='flex gap-2'>
              <div>
                <h4 className='font-bold'>Categories: </h4>
              </div>
              <div>
                <ul className='flex gap-2 text-[#2B1E35BF] text-[15px] flex-wrap'>
                  <li><a href='#'>Grocery | </a></li>
                  <li><a href='#'>Cigarettes | </a></li>
                  <li><a href='#'>Chips | </a></li>
                  <li><a href='#'>Curd | </a></li>
                  <li><a href='#'>Hookah | </a></li>
                  <li><a href='#'>Paan shop near me | </a></li>
                  <li><a href='#'>Egg price | </a></li>
                  <li><a href='#'>Amul | </a></li>
                  <li><a href='#'>Cheese slice | </a></li>
                  <li><a href='#'>Fresh Fruits | </a></li>
                  <li><a href='#'>Fresh Vegetables | </a></li>
                  <li><a href='#'>Refined oil | </a></li>
                  <li><a href='#'>Butter price |</a></li>
                  {/* <li><a href='#'>Panner price </a></li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className='ml-2'>
          <h3 className='font-bold font-uifontfamily'>Categories</h3>
        </div>

        <div className='m-5'>
          <ul className='grid grid-cols-2 sm:gird-cols-3 md:grid-cols-4 lg:grid-cols-5'>
            <li className='my-2.5'><a href='#'>Fruits & Vegetables</a></li>
            <li className='my-2.5'><a href='#'>Atta, Rice, Oil & Dals</a></li>
            <li className='my-2.5'><a href='#'>Masala & Dry Fruit</a></li>
            <li className='my-2.5'><a href='#'>Sweet Cravings</a></li>
            <li className='my-2.5'><a href='#'>Fronze Food & Ice Creams</a></li>


            <li className='my-2.5'><a href='#'>Baby Food</a></li>
            <li className='my-2.5'><a href='#'>Dairy, Bread & Eggs</a></li>
            <li className='my-2.5'><a href='#'>Cold Drinks & Juices</a></li>
            <li className='my-2.5'><a href='#'>Munchies</a></li>
            <li className='my-2.5'><a href='#'>Meats, Fish & Eggs</a></li>


            <li className='my-2.5'><a href='#'>Breakfast & Sauces</a></li>
            <li className='my-2.5'><a href='#'>Tea, Coffee & More</a></li>
            <li className='my-2.5'><a href='#'>Biscuites</a></li>
            <li className='my-2.5'><a href='#'>Makeup & Beauty</a></li>
            <li className='my-2.5'><a href='#'>Bath & Body</a></li>


            <li className='my-2.5'><a href='#'>Cleaning Essentials</a></li>
            <li className='my-2.5'><a href='#'>Home Needs</a></li>
            <li className='my-2.5'><a href='#'>Electricals & Accessories</a></li>
            <li className='my-2.5'><a href='#'>Hygiene & Grooming</a></li>
            <li className='my-2.5'><a href='#'>Health & Baby Care</a></li>


            <li className='my-2.5'><a href='#'>Homegrown Brands</a></li>
            <li className='my-2.5'><a href='#'>Paan Corner</a></li>
          </ul>
        </div>


        <div className='grid sm:grid-cols-4 px-10 py-20 border-t border-white/20'>
          <div>
            <img src={Zeptoredlogo} className='h-[36px] w-[105px]' />
            <div className='flex gap-5 py-5'>
              <a target='_blank' href='#'>
                <SiInstagram className='text-[25px] text-[#586274] max-md:ml-0' />
              </a>
              <a target='_blank' href='#'>
                <FaTwitter className='text-[25px] text-[#586274] max-md:ml-0' />
              </a>
              <a target='_blank' href='#'>
                <FaFacebook className='text-[25px] text-[#586274] max-md:ml-0' />
              </a>
              <a target='_blank' href='#'>
                <FaLinkedinIn className='text-[25px] text-[#586274] max-md:ml-0' />
              </a>
            </div>
          </div>

          <div className='mt-10 sm:mt-0'>
            <a target='_blank' href='#'>
              <p className='font-uifontfamily mb-3'>Home</p>
            </a>
            <a target='_blank' href='#'>
              <p className='font-uifontfamily mb-3'>Delivery Areas</p>
            </a>
            <a target='_blank' href='#'>
              <p className='font-uifontfamily mb-3'>Careers</p>
            </a>
            <a target='_blank' href='#'>
              <p className='font-uifontfamily mb-3'>Customer Support</p>
            </a>
            <a target='_blank' href='#'>
              <p className='font-uifontfamily mb-3'>Press</p>
            </a>
          </div>

          <div className='my-10 sm:my-0'>
            <a target='_blank' href='#'>
              <p className='font-uifontfamily mb-3'>Privacy Policy</p>
            </a>
            <a target='_blank' href='#'>
              <p className='font-uifontfamily mb-3'>Terms of Use</p>
            </a>
            <a target='_blank' href='#'>
              <p className='font-uifontfamily mb-3'>Responible Disclousere Policy</p>
            </a>
            <a target='_blank' href='#'>
              <p className='font-uifontfamily mb-3'>Mojo - a Zepto Blog</p>
            </a>
            <a target='_blank' href='#'>
              <p className='font-uifontfamily mb-3'>Sell on Zepto</p>
            </a>
          </div>

          <div>
            <p className='font-uifontfamily block font-bold'>Download App</p>
            <div className=''>
              <a href='https://play.google.com/store/apps/details?id=com.zeptoconsumerapp&pli=1'>
                <button className='flex gap-5 border border-gray-300 rounded-md mt-3 py-3.5 justify-center w-full p-10'>
                  <img src={playstorezepto} width={2} height={2} className='w-[14px]' style={{ color: 'transparent', objectFit: 'contain' }} />
                  <p className='block font-myfont text-[12px] font-bold text-nowrap'>Get it on play store</p>
                </button>
              </a>
              <a href='https://apps.apple.com/in/app/zepto-10-min-grocery-delivery/id1575323645'>
                <button className='flex gap-5 border border-gray-300 rounded-md mt-3 py-3.5 justify-center w-full p-10'>
                  <img src={appstorelogoxepto} width={2} height={2} className='w-[14px]' style={{ color: 'transparent', objectFit: 'contain' }} />
                  <p className='block font-myfont text-[12px] font-bold text-nowrap'>Get it on app store</p>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div >

      {islogin && <Login setislogin={setislogin} />
      }
      {
        isSlider && (
          <div
            onClick={() => setisSlider(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
        )
      }
    </>
  )
}

export default Nevigation
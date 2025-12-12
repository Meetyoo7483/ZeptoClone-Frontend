import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Profiledashboard from '../../assets/Profiledashboard.png';
import { IoIosWallet, IoMdHeartEmpty } from 'react-icons/io';
import { MdKeyboardArrowRight, MdOutlineAccountCircle } from 'react-icons/md';
import { CiGift } from 'react-icons/ci';
import { SlHandbag } from 'react-icons/sl';
import { LuMessageSquareText } from 'react-icons/lu';
import { GrLocation } from 'react-icons/gr';
import Zeptogray from '../../assets/Zepto.png';
import { FaChevronLeft, FaChevronRight, FaRegShareSquare, FaWhatsapp } from 'react-icons/fa';
import dashboardempty from '../../assets/dashboardempty.jpg';
import referalhend from '../../assets/referral-hand.svg'
import sharecircle from '../../assets/share-circle.svg'
import axios from 'axios';
import BaseUrl from '../../service/BaseUrl';
import toast from 'react-hot-toast';
import RenderRazorpay from './RenderRazorpay';


const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activePanel = location.hash ? location.hash.substring(1) : 'default';
  const [selectedPanel, setSelectedPanel] = useState(activePanel);
  const [userdata, setuserdata] = useState({})
  const [username, setusername] = useState("")
  const [order, setorder] = useState(null)

  const [showModal, setShowModal] = useState(false);
  const [inputAmount, setInputAmount] = useState("");
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressData, setAddressData] = useState({
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: ""
  });

  const handleAddressChange = e => {
    const { name, value } = e.target;
    setAddressData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressSubmit = async e => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      localStorage.setItem('addressData', JSON.stringify(addressData))
      const result = await axios.put(`${BaseUrl}/user/update/userdetails`, {
        User_id: userId,
        address: addressData
      });
      if (result.data.success) {
        toast.success("Address added successfully");
        setShowAddressForm(false);
        setAddressData({ street: "", area: "", city: "", state: "", pincode: "" });
        handleFetchUserDetails();
      }
    } catch {
      toast.error("Failed to add address");
    }
  };

  useEffect(() => {
    if (activePanel !== selectedPanel) {
      setSelectedPanel(activePanel);
    }
  }, [activePanel, selectedPanel]);

  const handlePanelClick = (panelName) => {
    setSelectedPanel(panelName);
    navigate(`#${panelName}`, { replace: true });
  };

  const handleFetchUserDetails = async () => {
    try {
      const result = await axios.get(`${BaseUrl}/user/fetch/details/${localStorage.getItem('userId')}`)
      if (result.data.success) {
        setuserdata(result.data.data)
        setusername(result.data.data.user_name)
        localStorage.setItem('user_name', result.data.data.user_name);
        toast.success(result.data.message);
      }
    } catch (error) {
      return console.log(error.message)
    }
  }

  const hendleUserUpdateDetilas = async () => {
    try {
      const result = await axios.put(`${BaseUrl}/user/update/userdetails`, {
        user_name: username,
        User_id: localStorage.getItem('userId')
      })

      if (result.data.success) {
        toast.success(result.data.message);
        handleFetchUserDetails()
      }

    } catch (error) {
      return console.log(error.message);

    }
  }

  const handleProceedToPayment = async () => {
    try {
      if (!inputAmount || inputAmount <= 0) {
        toast.error("Enter a valid amount");
        return;
      }
      const body = {
        amount: parseInt(inputAmount, 10),
        userId: localStorage.getItem('userId')
      };
      const res = await axios.post(`${BaseUrl}/user/add/amount`, body);
      if (res.data.success) {
        setorder(res.data.data);
        setShowModal(false);
        setInputAmount("");
      } else {
        toast.error("Could not create payment order");
      }
    } catch (error) {
      toast.error("Failed to initiate payment");
    }
  };

  console.log(userdata);


  const panelContent = {
    default: (
      <div className="flex-1 max-md:hidden ">
        <div className="flex items-center space-x-4 p-[10px]">
          <span className="text-xl"><FaChevronLeft /></span>
          <h1 className="text-lg font-semibold">Settings</h1>
        </div>
        <div className="flex flex-col items-center justify-center text-center bg-[#f0f4f9] p-[20px]">
          <img src={dashboardempty} className='bg-transparent flex justify-center' />
          <h2 className="text-lg font-medium">No orders yet</h2>
          <button className="mt-4 px-4 py-2 bg-white text-[#4C1577] border border-[#4C1577] rounded">Browse products</button>
          <button className="mt-2 px-4 py-2 border border-pink-500 text-pink-500 rounded-2xl">↓ Load More</button>
        </div>
      </div>
    ),
    // freecash: <div className="p-6"><h1 className="text-xl font-semibold">Free Cash Details</h1></div>,
    orders:
      <div className="flex-1 max-md:hidden ">
        <div className="flex items-center space-x-4 p-[10px]">
          <span className="text-xl"><FaChevronLeft /></span>
          <h1 className="text-lg font-semibold">Settings</h1>
        </div>
        <div className="flex flex-col items-center justify-center text-center bg-[#f0f4f9] p-[20px]">
          <img src={dashboardempty} className='bg-transparent flex justify-center' />
          <h2 className="text-lg font-medium">No orders yet</h2>
          <button className="mt-4 px-4 py-2 bg-white text-[#4C1577] border border-[#4C1577] rounded">Browse products</button>
          <button className="mt-2 px-4 py-2 border border-pink-500 text-pink-500 rounded-2xl">↓ Load More</button>
        </div>
      </div>,
    support:
      <div className='scroll-x'>
        <h1 className="text-xl font-bold px-2 pb-4">FAQs</h1>

        <div className='space-y-3'>
          <div className='flex items-center justify-between px-2'>
            <a href='#' className='px-2 font-medium'>Coupons & Offers</a>
            <FaChevronRight size={12} color='red' />
          </div>
          <hr className='text-gray-300' />

          <div className='flex items-center justify-between px-2'>
            <a href='#' className='px-2 font-medium'>Coupons & Offers</a>
            <FaChevronRight size={12} color='red' />
          </div>
          <hr className='text-gray-300' />


          <div className='flex items-center justify-between px-2'>
            <a href='#' className='px-2 font-medium'>Coupons & Offers</a>
            <FaChevronRight size={12} color='red' />
          </div>
          <hr className='text-gray-300' />

          <div className='flex items-center justify-between px-2'>
            <a href='#' className='px-2 font-medium'>Coupons & Offers</a>
            <FaChevronRight size={12} color='red' />
          </div>
          <hr className='text-gray-300' />

          <div className='flex items-center justify-between px-2'>
            <a href='#' className='px-2 font-medium'>Coupons & Offers</a>
            <FaChevronRight size={12} color='red' />
          </div>
          <hr className='text-gray-300' />

          <div className='flex items-center justify-between px-2'>
            <a href='#' className='px-2 font-medium'>Coupons & Offers</a>
            <FaChevronRight size={12} color='red' />
          </div>
          <hr className='text-gray-300' />

          <div className='flex items-center justify-between px-2'>
            <a href='#' className='px-2 font-medium'>Coupons & Offers</a>
            <FaChevronRight size={12} color='red' />
          </div>
          <hr className='text-gray-300' />

          <div className='flex items-center justify-between px-2'>
            <a href='#' className='px-2 font-medium'>Coupons & Offers</a>
            <FaChevronRight size={12} color='red' />
          </div>
          <hr className='text-gray-300' />

          <div className='flex items-center justify-between px-2'>
            <a href='#' className='px-2 font-medium'>Coupons & Offers</a>
            <FaChevronRight size={12} color='red' />
          </div>
          <hr className='text-gray-300' />
        </div>

      </div>,
    referrals: (
      <div className='w-[600px] mx-auto relative'>
        {/* Gradient Header */}
        <div className='bg-gradient-to-r from-[#7B5AF5] to-[#A58AF5] rounded-t-xl h-[160px] px-5 pt-4 relative'>
          <p className='text-white font-bold tracking-wide text-[18px]'>
            25% off for you, Pass for them @ ₹1!
          </p>
          {/* Overlapping Right Side Image */}
          <img
            src={referalhend}
            alt='offer'
            className='absolute top-0 right-0 h-[150px] mt-[10px] mr-[10px] z-30 rounded-lg'
          />
        </div>

        {/* White Card Section (overlapping the purple header) */}
        <div className='bg-white w-[550px] rounded-xl shadow-md absolute left-1/2 -translate-x-1/2 top-[110px] z-20'>
          <div className='p-6'>
            <p className='font-bold text-[17px]'>How it works</p>

            {/* Step 1 */}
            <div className='mt-4 flex gap-3 items-start'>
              <img src={sharecircle} alt='step' className='w-5 h-5 mt-[4px]' />
              <p className='text-[15px] leading-snug'>
                Share the referral link <span className='font-semibold'>with your friend</span>
              </p>
            </div>

            {/* Step 2 */}
            <div className='mt-4 flex gap-3 items-start'>
              <img src={sharecircle} alt='step' className='w-5 h-5 mt-[4px]' />
              <p className='text-[15px] leading-snug'>
                After your friend places their first order, you
                <span className='font-semibold'> get 25% off</span> up to ₹200 on your next order
              </p>
            </div>

            {/* Step 3 */}
            <div className='mt-4 flex gap-3 items-start'>
              <img src={sharecircle} alt='step' className='w-5 h-5 mt-[4px]' />
              <p className='text-[15px] leading-snug'>
                Upon 10 successful referrals, <span className='font-semibold'>you earn ₹2000</span>
              </p>
            </div>

            {/* Buttons */}
            <div className='mt-6 flex flex-col gap-3'>
              <button
                className='flex gap-2 items-center border border-black p-3 w-full justify-center rounded-xl'
                type='button'
              >
                <FaWhatsapp color='green' size={20} />
                <span className='text-[15px] font-medium'>Invite via Whatsapp</span>
              </button>

              <button
                className='flex gap-2 items-center border border-black p-3 w-full justify-center rounded-xl'
                type='button'
              >
                <FaRegShareSquare size={20} />
                <span className='text-[15px] font-medium'>Share Invite Link</span>
              </button>
            </div>
          </div>
        </div>

        {/* Spacer below the absolute content */}
        <div className='pt-[300px]'>
          <hr className='opacity-100 mt-6' />
          <p className='text-[20px] font-bold mt-4 text-center'>Your Referrals</p>
          <p className='text-gray-500 text-center mt-2'>
            No referrals yet. Share with friends to start saving!
          </p>
        </div>
      </div>
    ),
    // addresses:
    //   <div>
    //     <div className='flex items-center justify-between px-2 border border-gray-300 p-5 m-2 shadow-md'>
    //       <p>All Saved Addresses</p>
    //       <button className='bg-pink-500 text-white rounded-xl p-3'>Add New Address</button>
    //     </div>
    //   </div>,
    addresses: (
      <div>
        <div className='flex items-center justify-between px-2 border border-gray-300 p-5 m-2 shadow-md'>
          <p>All Saved Addresses</p>
          <button
            type="button"
            className='bg-pink-500 text-white rounded-xl p-3'
            onClick={() => setShowAddressForm((v) => !v)}
          >
            {showAddressForm ? "Cancel" : "Add New Address"}
          </button>
        </div>

        {showAddressForm && (
          <form
            className="max-w-lg mx-auto bg-white rounded-xl p-5 shadow space-y-3 border mt-2"
            onSubmit={handleAddressSubmit}
          >
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold mb-1">Street</label>
              <input
                type="text"
                name="street"
                value={addressData.street}
                onChange={handleAddressChange}
                className="border rounded p-2"
                placeholder="Street address"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold mb-1">Area</label>
              <input
                type="text"
                name="area"
                value={addressData.area}
                onChange={handleAddressChange}
                className="border rounded p-2"
                placeholder="Area"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold mb-1">City</label>
              <input
                type="text"
                name="city"
                value={addressData.city}
                onChange={handleAddressChange}
                className="border rounded p-2"
                placeholder="City"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold mb-1">State</label>
              <input
                type="text"
                name="state"
                value={addressData.state}
                onChange={handleAddressChange}
                className="border rounded p-2"
                placeholder="State"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold mb-1">Pincode</label>
              <input
                type="number"
                name="pincode"
                value={addressData.pincode}
                onChange={handleAddressChange}
                className="border rounded p-2"
                placeholder="Pincode"
                required
              />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="bg-pink-500 text-white rounded-xl py-2 px-6 mt-3">Save Address</button>
            </div>
          </form>
        )}

        {/* Display saved addresses below form if desired
        <div className='m-2 border-black shadow-md p-2 rounded-md'>
          <h2>Saved Address</h2>
          <div className='flex p-2'>
            <p className='px-1'>{userdata?.address?.street}</p>
            <p className='px-1'>{userdata?.address?.area}</p>
            <p className='px-1'>{userdata?.address?.city}</p>
            <p className='px-1'>{userdata?.address?.state}</p>
            <p className='px-1'>{userdata?.address?.pincode}</p>
          </div>
        </div> */}
        <div className="m-4 max-w-md bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg border border-gray-200 p-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <span className="material-icons text-black">location_on</span>
            Saved Address
          </h2>
          <div className="flex flex-col space-y-1 px-2">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Street:</span>
              <span className="text-gray-900">{userdata?.address?.street}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Area:</span>
              <span className="text-gray-900">{userdata?.address?.area}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">City:</span>
              <span className="text-gray-900">{userdata?.address?.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">State:</span>
              <span className="text-gray-900">{userdata?.address?.state}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Pincode:</span>
              <span className="text-gray-900">{userdata?.address?.pincode}</span>
            </div>
          </div>
        </div>

      </div>
    ),

    profile:
      <div>
        <form>
          <>
            <div className='p-2' >
              <label className='text-gray-500 font-semibold px-1'>Name*</label>
              <br />
              <input
                type='text'
                placeholder='Enter your name'
                className='border text-[15px] tracking-wide border-gray-300 w-full rounded-md p-1'
                value={userdata.user_name || username}
                onChange={e => setusername(e.target.value)}
                required
              />

            </div>


            <div className='p-2' >
              <label className='text-gray-500 font-semibold px-1' readonly>Email Address*</label>
              <br />
              <input type='text' className='border text-[15px] tracking-wide border-gray-300 w-full rounded-md p-1' value={userdata.user_email} readOnly disabled />
              <span className='text-[10px] tracking-wider text-gray-500'>We promise not to spam you</span>
            </div>
          </>

          <div className='justify-end flex pr-5'>
            <button className='bg-pink-500 text-white rounded-xl p-2 px-5' onClick={hendleUserUpdateDetilas}>Submit</button>
          </div>

          <br />
          <hr />

          <div className='px-3 mt-3'>
            <a href='#' className='text-pink-500 tracking-wider font-medium'>Delete Account</a><br />
            <span className='text-gray-500 text-[13px]'>Deleting your account will remove all your orders, wallet amount and any active referral</span>
          </div>
        </form>
      </div>,
  };


  useEffect(() => {
    handleFetchUserDetails()
  }, [])
  return (
    <>
      <br />

      <div className='flex border border-gray-300 rounded-lg h-screen w-full flex-col md:flex-row md:w-[800px] lg:w-[900px] mx-auto shadow-2xl'>
        <div className='p-3 shadow-2xl'>
          <div className='flex items-center p-3 gap-3'>
            <img src={Profiledashboard} alt="Profile" />
            <div>
              <p className='font-semibold'>{userdata.user_name || 'Anoneumsn'}</p>
              <span className='text-[12px] text-gray-400'>{userdata.user_email}</span>
            </div>
          </div>

          <div className='bg-gray-300 p-3 rounded-lg'>
            <div className='flex items-center gap-2'>
              <IoIosWallet size={20} color='#9A18CA' />
              <p className='text-[13px] tracking-wide'>Zepto Cash & Gift Card</p>
              <MdKeyboardArrowRight />
            </div>
            <div><span>---------------------------</span></div>
            <div className='flex items-center gap-8'>
              <span className='text-[13px] text-gray-400'>Available Balance: ₹{userdata.wallet}</span>
              <button type='button' onClick={handleOpen} className='rounded-lg bg-black text-[13px] text-white p-2'>Add Balance</button>
            </div>
          </div>
          {/* Modal for input amount */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-72">
                <h2 className="text-lg font-semibold mb-4">Enter Amount to Add</h2>
                <input
                  type="number"
                  min="1"
                  placeholder="Amount (₹)"
                  value={inputAmount}
                  onChange={e => setInputAmount(e.target.value)}
                  className="border w-full p-2 rounded mb-4"
                />
                <div className="flex gap-3 justify-end">
                  <button className="px-4 py-2 bg-pink-500 text-white rounded" onClick={handleProceedToPayment}>Proceed</button>
                  <button className="px-4 py-2 bg-gray-300 rounded" onClick={handleClose}>Cancel</button>
                </div>
              </div>
            </div>
          )}
          {order && (
            <RenderRazorpay
              amount={order.amount}
              currency={order.currency}
              orderId={order.id}
              transactionID=""
              keyId={order.key_id}
            />
          )}
          <br />

          <div className='space-y-3'>
            <div className='flex justify-between cursor-pointer'>
              <div className='flex items-center gap-2'>
                <CiGift size={20} color='red' />
                <p>Free Cash</p>
              </div>
              <p className='font-semibold'>₹{userdata.free_cash}</p>
            </div>
            <hr />

            <div onClick={() => handlePanelClick('orders')} className='flex items-center gap-2 cursor-pointer'>
              <SlHandbag size={20} />
              <p>Orders</p>
            </div>
            <hr />

            <div onClick={() => handlePanelClick('support')} className='flex items-center gap-2 cursor-pointer'>
              <LuMessageSquareText size={20} />
              <p>Customer Support</p>
            </div>
            <hr />

            <div onClick={() => handlePanelClick('referrals')} className='flex items-center gap-2 cursor-pointer'>
              <IoMdHeartEmpty size={20} />
              <p>Manage Referrals</p>
            </div>
            <hr />

            <div onClick={() => handlePanelClick('addresses')} className='flex items-center gap-2 cursor-pointer'>
              <GrLocation size={20} />
              <p>Addresses</p>
            </div>
            <hr />

            <div onClick={() => handlePanelClick('profile')} className='flex items-center gap-2 cursor-pointer'>
              <MdOutlineAccountCircle size={20} />
              <p>Profile</p>
            </div>
            <hr />
          </div>

          <div className='flex items-center justify-center my-3 font-bold'>
            <p>Log out</p>
          </div>

          <div className='flex items-center justify-center my-3 font-bold'>
            <img src={Zeptogray} alt="Zepto Logo" style={{ filter: 'grayscale(100%) brightness(250%)' }} className='h-[30px]' />
          </div>
        </div>

        {/* Right side panel content */}
        <div className="flex-1 hidden md:block">
          <div className="flex items-center space-x-4 p-[10px]">
          </div>
          {panelContent[selectedPanel] || panelContent['default']}
        </div>
      </div>
      {order && (
        <RenderRazorpay
          amount={order.amount}
          currency={order.currency}
          orderId={order.id}
          transactionID=""
          keyId={order.key_id}
        />
      )}
    </>
  );
};

export default Profile;
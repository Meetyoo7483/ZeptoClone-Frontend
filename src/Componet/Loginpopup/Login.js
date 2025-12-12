
import React, { useEffect, useState } from 'react'
import loginmobilezepto from '../assets/Loginmobilzepto.png'
import Loginplaystore from '../assets/Login-zeptoplaystore.svg'
import Loginappstore from '../assets/Login-zeptoappstore.svg'
import Zeptored from '../assets/Zeptored.svg'
import Otp from '../OTPpopup/Otp'
import { useNavigate } from 'react-router-dom'
import BaseUrl from '../service/BaseUrl'
import axios from 'axios'
import toast from 'react-hot-toast';
import Spinner from '../Spinner/Spinner'

const Login = ({ setislogin }) => {
    const navigate = useNavigate()
    const [otp, setotp] = useState(false)
    const [email, setemail] = useState("")
    const [isSpin, setisSpin] = useState(false)


    // send otp
    const Otpsend = async () => {
        if (!email) {
            alert("Please enter your email")
            return
        }
        setisSpin(true)

        try {
            const result = await axios.post(`${BaseUrl}/user/send/sendotp`, { email })

            if (result?.data?.success) {
                setisSpin(false)
                localStorage.setItem('email',email)
                toast.success(result.data.message)
                setotp(true)   // show OTP popup
            }
        } catch (error) {
            setisSpin(false)
            console.error(error.message)
            toast.error("Request failed. Check console for details.")
        }
    }
    if(otp){
        return <Otp setotp={setotp} setislogin={setislogin} email={email} />
    }
    return (
        <>
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={() => setislogin(false)}
            >
                <div
                    className="flex justify-center p-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Left Section */}
                    <div className="rounded-xl sm:rounded-tr-none sm:rounded-br-none px-10 bg-purple-950 w-[450px] shadow-lg">
                        <div className="flex flex-col p-5 space-y-3">
                            <img src={Zeptored} className="h-[45px] w-[150px]" alt="Zepto" />
                            <p className="text-[25px] text-white tracking-wide font-semibold">
                                Groceries delivered <br /> in 10 minutes
                            </p>

                            <div className="space-y-2">
                                <div className="flex items-center w-full max-w-md px-4 py-2 mt-3 bg-white rounded-full shadow border border-gray-300">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="flex-1 bg-transparent outline-none placeholder-gray-400"
                                    />
                                </div>
                                {isSpin ?
                                
                                <Spinner /> : 
                                
                                <button
                                    type="button"
                                    onClick={Otpsend}
                                    className="bg-[#E5478D] w-full max-w-md px-4 py-2 rounded-full text-white"
                                >
                                    Send Otp
                                </button>
                                } 
                            </div>

                            <div>
                                <p className="text-white text-[14px] text-center mt-3">
                                    By continuing, you agree to our
                                </p>
                                <p className="text-pink-500 text-center">
                                    Terms of Service & Privacy Policy
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="bg-[#FDEDF9] rounded-xl rounded-tl-none rounded-bl-none w-[200px] hidden sm:block shadow-lg">
                        <div className="flex flex-col py-5 px-3 space-y-1">
                            <img
                                src={loginmobilezepto}
                                className="w-[100px] mx-auto"
                                alt="Zepto Mobile"
                            />
                            <div>
                                <p className="text-[#3C1262] text-center font-semibold text-[25px]">
                                    Order faster <br /> & easier everytime
                                </p>
                                <p className="text-gray-500 text-[13px] text-center font-semibold">
                                    with the Zepto App
                                </p>
                            </div>
                            <img
                                src={Loginplaystore}
                                className="w-[120px] mx-auto"
                                alt="Playstore"
                            />
                            <img
                                src={Loginappstore}
                                className="w-[120px] mx-auto"
                                alt="Appstore"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* OTP Popup */}
            {/* {otp && <Otp setotp={setotp} setislogin={setislogin} />} */}
        </>
    )
}

export default Login

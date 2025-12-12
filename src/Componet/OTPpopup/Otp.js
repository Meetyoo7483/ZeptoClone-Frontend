import React, { useEffect, useState } from 'react'
import loginmobilezepto from '../assets/Loginmobilzepto.png'
import Loginplaystore from '../assets/Login-zeptoplaystore.svg'
import Loginappstore from '../assets/Login-zeptoappstore.svg'
import { LuMoveLeft } from 'react-icons/lu'
import { FaRegComment } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios'
import BaseUrl from '../service/BaseUrl'

const Otp = ({ setotp, setislogin }) => {
    const navigate = useNavigate()
    const otpLength = 4  // number of OTP digits
    const [otp, setOtp] = useState(new Array(otpLength).fill(''))
    const [timeLeft, setTimeLeft] = useState(2 * 60); // 2 minutes

    useEffect(() => {
        if (timeLeft <= 0) return
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [timeLeft])

    const formatTime = seconds => {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, "0")
        const secs = (seconds % 60).toString().padStart(2, "0")
        return `${minutes}:${secs}`
    }

    const handleChange = (e, index) => {
        const val = e.target.value.replace(/[^0-9]/g, '')
        if (val.length > 1) return

        const newOtp = [...otp]
        newOtp[index] = val
        setOtp(newOtp)

        // focus next input
        if (val !== '' && index < otpLength - 1) {
            const next = document.getElementById(`otp-input-${index + 1}`)
            if (next) next.focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            const prev = document.getElementById(`otp-input-${index - 1}`)
            if (prev) prev.focus()
        }
    }

    const VeriFyOtp = async () => {
        try {
            const result = await axios.post(`${BaseUrl}/user/send/verifyotp`, { otp: otp.join('').toString(), email: localStorage.getItem('email') });
            if (result.data.success) {
                toast.success(result.data.message);
                // localStorage.removeItem('email')
                localStorage.setItem('userId', result.data.data)
                setislogin(false)
                navigate('/profile')
            }
        } catch (error) {
            console.error(error.message);
            toast.error("Something went wrong. Try again.");
        }
    };

    const resend = () => {
        // resend logic
        setTimeLeft(2 * 60)
    }

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className='flex justify-center p-2'>
                    <div className='rounded-xl sm:rounded-tr-none sm:rounded-br-none hover:cursor-pointer px-10 bg-purple-950 w-[450px] shadow-lg '>
                        <div className='p-1'>
                            <LuMoveLeft
                                color='white'
                                size={24}
                                onClick={() => setotp(false)}
                            />
                        </div>
                        <div className='flex-col items-center space-y-2'>
                            <div>
                                <p className='text-white font-semibold tracking-wider text-[35px]'>OTP Verification</p>
                            </div>
                            <div>
                                <p className='text-white font-medium text-[13px] tracking-wider pl-1'>OTP has been sent to zepto*****.gmail.com</p>
                            </div>
                            <div className='flex gap-2 justify-center space-y-5 '>
                                {otp.map((digit, idx) => (
                                    <input
                                        key={idx}
                                        id={`otp-input-${idx}`}
                                        type='text'
                                        className='rounded-full mt-5 w-8 h-10 text-center'
                                        maxLength={1}
                                        value={digit}
                                        onChange={e => handleChange(e, idx)}
                                        onKeyDown={e => handleKeyDown(e, idx)}
                                    />
                                ))}
                            </div>
                            <br />
                            <button
                                type="button"
                                className="bg-[#E5478D] w-full max-w-md px-4 py-2 rounded-full text-white"
                                onClick={VeriFyOtp}
                            >
                                Verify OTP
                            </button>
                            <div className='text-center'>
                                <p className='text-white text-[35px] tracking-wider my-6 '>
                                    {formatTime(timeLeft)}
                                </p>
                            </div>

                            {timeLeft === 0 && (
                                <div>
                                    <div className='text-center'>
                                        <a className='text-white font-medium text-[13px] hover:cursor-pointer tracking-wider'>Didn't get it?</a>
                                    </div>
                                    <div className='flex items-center pb-2 gap-2 justify-center'>
                                        <FaRegComment size={20} color='red' />
                                        <a
                                            href='#'
                                            className='text-white font-medium text-[13px] tracking-wider underline'
                                            onClick={resend}
                                        >
                                            Send OTP(Mail)
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='bg-[#FDEDF9] rounded-xl rounded-tl-none rounded-bl-none w-[200px] hidden sm:block shadow-lg'>
                        <div className='flex flex-col py-5 px-3 space-y-1'>
                            <img src={loginmobilezepto} className='w-[100px] mx-auto' />
                            <div>
                                <p className='text-[#3C1262] text-center font-semibold text-[25px]'>Order faster<br /> & easier everytime</p>
                                <p className='text-gray-500 text-[13px] text-center font-semibold'>with the Zepto App</p>
                            </div>
                            <img src={Loginplaystore} className='w-[120px] mx-auto' />
                            <img src={Loginappstore} className='w-[120px] mx-auto' />
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
}

export default Otp

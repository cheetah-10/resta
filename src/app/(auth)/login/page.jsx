//login.jsx
"use client";
import { useOtp } from '@/context/OtpContext';
import { auth } from '@/lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function Login() {

  const { phone, setPhone, setConfirmationResult, setMode } = useOtp()
  const [loading, setLoading] = useState(false)
  const router = useRouter()


  const sendOtp = async (e) => {
    e.preventDefault()
    if (!phone) {
      toast.error("Enter phone number")
      return
    }

    try {
      setLoading(true)

      // reset recaptcha if exists
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear()
      }

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      )

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      )

      setConfirmationResult(confirmationResult)
      toast.success("OTP sent")
      setMode("login");
      router.push("/verify");

    } catch (err) {
      console.error(err)
      toast.error("Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='w-fit mx-auto md:mx-0 flex  md:max-h-screen h-screen'>
      <section className=' md:w-[50%] flex-column flex'>
        <div className="lg:mx-50 py-12.5  md:ml-5 text-center md:text-start flex-col flex h-full ">

          <div className="content">

            <div className="logo w-fit mx-auto md:mx-0">
              <Image className='bg-' src='/images/logo.png' alt="login" width={233.33} height={200} />
            </div>

            <p className='font-semibold text-[35px] mt-25'>Welcome!</p>
            <p className='lg:text-[20px] text-[#808080] mt-7.5'>Enter Your Phone Number</p>
            <form onSubmit={sendOtp}>
              <input
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value) }}
                placeholder="+201xxxxxxxxx"
                className="lg:w-118.5 w-80 my-5 h-12.5 rounded-sm border border-black/20 px-4 outline-none  transition-all duration-300  ease-out "
              />

              <div className="mt-auto md:text-start lg:text-center">
                <button
                  disabled={loading || !phone}
                  className='border-[#FFBB15] cursor-pointer border-[3px] lg:w-118.5 w-80 h-12.5 rounded-[10px]'>
                  {loading ? "Sending..." : "Next"}

                </button>
                <p className='mt-14 text-[#808080]'>Don't have an Account? <span className='text-red-600'>Register</span></p>
              </div>

              <div id="recaptcha-container"></div>

            </form>
          </div>



        </div>

      </section >
      <section className='md:block hidden md:w-[50%]'>
        <div className="lg:mx-24 xl:mx-50 my-12.5">
          <Image className='md:mt-[204.65px] xl:ml-20' alt='login' src='/images/login.png' width={800} height={774.39} />

        </div>
      </section>
    </div >
  )
}

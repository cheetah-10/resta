//verifiy.jsx
'use client'
import { useAuth } from '@/context/AuthContext'
import { useOtp } from '@/context/OtpContext'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Verify() {
  const {
    confirmationResult,
    mode,
    fullName,
    phone,
  } = useOtp()

  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const {setToken} = useAuth()

  useEffect(() => {
    if (!confirmationResult) {
      toast.error("Session expired")
      router.push(mode === "register" ? "/register" : "/login")
    }
  }, [confirmationResult, mode, router])

  const sendToBackend = async (idToken) => {
    const url =
      mode === "register"
        ? "http://localhost:5000/auth/register"
        : "http://localhost:5000/auth/login"

    const body =
      mode === "register"
        ? { idToken, fullName }
        : { idToken }

    const res = await axios.post(url, body)
    localStorage.setItem('token', res.data.data.token )

    setToken(res.data.data.token)
    return res.data
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!code) {
      toast.error("Enter OTP code")
      return
    }

    try {
      setLoading(true)

      const result = await confirmationResult.confirm(code)
      const user = result.user
      const idToken = await user.getIdToken()
      console.log('idToken li', idToken)

      const backendUser = await sendToBackend(idToken)

      localStorage.setItem("user", JSON.stringify(backendUser))

      toast.success(
        mode === "register"
          ? "Registered successfully"
          : "Logged in successfully"
      )

      router.push("/")
    } catch (err) {
      console.error(err)
      toast.error("Invalid or expired OTP")
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
              <Image className='bg-' src='/images/logo.png' alt='logo' width={233.33} height={200} />
            </div>

            <p className='font-semibold text-[35px] mt-25'>  {mode === "register" ? "Verify Registration" : "Login"}
            </p>
            <p className='lg:text-[20px] text-[#808080] mt-7.5'>Enter the authentication code we sent at {phone}</p>
            <input
              readOnly
              placeholder={phone}
              className="lg:w-118.5 w-80 my-5 h-12.5 rounded-sm border border-black/20 px-4 outline-none  transition-all duration-300  ease-out "
            />
            <input
              type="text"
              value={code}
              inputMode="numeric"
              required
              onChange={(e) => setCode(e.target.value)}
              placeholder="Login Code"
              className="lg:w-118.5 w-80 my-5 h-12.5 rounded-sm border border-black/20 px-4 outline-none  transition-all duration-300  ease-out "
            />

          </div>

          <div className="mt-auto mb-5 md:text-start lg:text-center">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className='border-[#FFBB15] cursor-pointer border-[3px] lg:w-118.5 w-80 h-12.5 rounded-[10px]'>
              {loading ? "Verifying..." : "Submit"}

            </button>
          </div>

        </div>

      </section>
      <section className='md:block hidden md:w-[50%]'>
        <div className="lg:mx-24 xl:mx-50 my-12.5">
          <Image className='md:mt-[204.65px] xl:ml-20' alt='login' src='/images/otp.png' width={800} height={774.39} />

        </div>
      </section>
    </div>
  )
}

//register.jsx
'use client'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import Image from 'next/image'
import React, { useState } from 'react'
import { auth } from "@/lib/firebase";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useOtp } from '@/context/OtpContext';



export default function SignUp() {
    const { fullName, setFullName, setMode } = useOtp();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter()
    const { setConfirmationResult, phone, setPhone } = useOtp();


    const sendOtp = async (e) => {
        e.preventDefault(); // يمنع reload

        if (!fullName || !phone) {
            setError("Please fill all fields");
            return;
        }

        try {
            setLoading(true);
            setError("");

            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
            }
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                "recaptcha-container",
                { size: "invisible" }
            );



            const confirmationResult = await signInWithPhoneNumber(
                auth,
                phone,
                window.recaptchaVerifier
            );

            // نخزنها عشان صفحة OTP
            window.confirmationResult = confirmationResult;
            setConfirmationResult(confirmationResult);
            toast.success("OTP sent successfully!");

            // ممكن هنا تروحي لصفحة OTP
            setMode("register");
            router.push("/verify");

            console.log("OTP sent");

        } catch (err) {
            console.error(err);
            setError("Failed to send OTP");
            const errMsg = "Failed to send OTP";
            toast.error(errMsg)
        } finally {
            setLoading(false);
        }
    };





    return (
        <div className='w-fit mx-auto lg:mx-0 flex md:max-h-screen h-screen'>
            <section className=' lg:w-[50%] flex-column flex'>
                <div className="lg:mx-50 py-12.5 md:ml-5 text-center lg:text-start ">

                    <div className="content">

                        <div className="logo w-fit mx-auto lg:mx-0">
                            <Image className='bg-' alt='register' src='/images/logo.png' width={233.33} height={200} />
                        </div>

                        <p className='font-semibold text-[35px] mt-25 lg:mt-10'>Register As Cafe/Restaurant</p>
                        <p className='lg:text-[20px] text-[#808080] mt-7.5'>Register Now!</p>
                        <form onSubmit={sendOtp}>

                            <input
                                type="text"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="lg:w-118.5 w-80 mr-3 mt-3 h-12.5 rounded-sm border border-black/20 px-4 outline-none  transition-all duration-300  ease-out "
                            />

                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="lg:w-118.5 w-80 mr-3 my-3 h-12.5 rounded-sm border border-black/20 px-4 outline-none  transition-all duration-300  ease-out "
                            />

                            <div className="mt-auto text-start lg:text-center w-fit mx-auto">
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className='border-[#FFBB15] cursor-pointer border-[3px] mr-3 lg:w-118.5 w-80 h-12.5 rounded-[10px]'>
                                    {loading ? "Sending..." : "Next"}

                                </button>
                                <div id="recaptcha-container"></div>
                            </div>
                        </form>


                    </div>



                </div>

            </section>
            <section className='lg:block hidden md:w-[50%]'>
                <div className="mx-24 my-10">
                    <Image className='xl:my-25 xl:ml-20' alt='register' src='/images/signup1.png' width={800} height={774.39} />

                </div>
            </section>
        </div>
    )
}

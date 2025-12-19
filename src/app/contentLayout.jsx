'use client'
import "./globals.css";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export default function ContentLayout({ children }) {
    const path = usePathname()
    const [isNavbar, setIsNavbar] = useState(true)
    useEffect(() => {
        if (path.includes('dashboard')) setIsNavbar(false)
        else setIsNavbar(true)
    }, [])

    return (

<>
            {isNavbar && <Navbar />}

            {children}
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                }}
            />
            {isNavbar&&<Footer />}
</>
    );
}

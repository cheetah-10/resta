'use client'

import { useEffect, useState } from "react";
import svgPaths from '../../../imports/svg';
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartItemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const { token } = useAuth()
  const router = useRouter()
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = ()=>{
    localStorage.removeItem('token')
    router.push('/login')
  }
  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-colors duration-300
        ${scrolled ? 'bg-black shadow-md' : 'bg-transperant'}
      `}
    >      <div className="container mx-auto px-4 lg:px-12 py-4 md:py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-[50px] h-[42px] md:w-[70px] md:h-[60px]">
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70 60">
              <g>
                <g>
                  <path d={svgPaths.p98af280} fill="#FFBB15" />
                  <ellipse cx="22.8688" cy="22.0838" fill="#FFBB15" rx="3.39676" ry="3.38373" />
                </g>
                <g>
                  <path d={svgPaths.p3bdcbf00} fill="white" />
                  <path d={svgPaths.p3f557d00} fill="white" />
                  <path d={svgPaths.p153b5931} fill="white" />
                  <path d={svgPaths.p15b30b00} fill="white" />
                  <path d={svgPaths.p1eec8e80} fill="white" />
                  <path d={svgPaths.p18a6d580} fill="white" />
                  <path d={svgPaths.pe9100} fill="white" />
                  <path d={svgPaths.pbe21700} fill="white" />
                  <path d={svgPaths.p1703d500} fill="white" />
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-12">
          <Link href="/" className="text-[#ffbb15] text-base lg:text-lg font-medium relative">
            Home
            <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#ffbb15]"></div>
          </Link>
          <Link href="/products" className="text-white text-base lg:text-lg hover:text-[#ffbb15] transition-colors">
            Products
          </Link>
          <Link href="/restaurants" className="text-white text-base lg:text-lg hover:text-[#ffbb15] transition-colors">
            Restaurants
          </Link>

          <Link href="/dashboard" className="text-white text-base lg:text-lg hover:text-[#ffbb15] transition-colors">
            Dashboard
          </Link>
          {token ? (<Link onClick={logout} href="/login" className="text-white text-base lg:text-lg hover:text-[#ffbb15] transition-colors">
            Sign out
          </Link>) : (<> <Link href="/login" className="text-white text-base lg:text-lg hover:text-[#ffbb15] transition-colors">
            Login
          </Link>
          <Link href="/register" className="text-white text-base lg:text-lg hover:text-[#ffbb15] transition-colors">
            Sign up
          </Link></>)}


        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-3 lg:space-x-4">
          <button className="w-10 h-10 flex items-center justify-center text-white hover:text-[#ffbb15] transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d={svgPaths.p1052c080} />
              <path d={svgPaths.p2f572300} />
            </svg>
          </button>
          <Link href='/cart' className="relative w-10 h-10 flex items-center justify-center text-white hover:text-[#ffbb15] transition-colors">
            <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-3 -right-3 w-7 h-7 bg-red-600 rounded-full flex items-center justify-center text-[18px] text-white">
              {getCartItemCount()}
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-white hover:text-[#ffbb15] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 17">
              <path d={svgPaths.pe46f680} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <Link href="/" className="text-[#ffbb15] text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/products" className="text-white text-lg hover:text-[#ffbb15] transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Products
            </Link>
            <Link href="/about" className="text-white text-lg hover:text-[#ffbb15] transition-colors" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </Link>
            <Link href="/contact" className="text-white text-lg hover:text-[#ffbb15] transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Contact US
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};


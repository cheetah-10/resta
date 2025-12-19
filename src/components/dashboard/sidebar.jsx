'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
 
  return (
    <aside
      className={`
        fixed left-0 z-40 h-full
        bg-linear-to-t bg-[#000] text-[#E5A613]
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'w-64' : 'w-16'}
      `}
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-4 font-medium">

          {/* Toggle Button */}
          <li className="flex justify-end sm:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" d="M5 7h14M5 12h14M5 17h10" />
              </svg>
            </button>
          </li>

          {/* Dashboard */}
          <li>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-2 py-2 mt-20 text-2xl rounded hover:bg-[#d39f12]/20"
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z" />
              </svg>

              <span
                className={`transition-all duration-300 ${
                  sidebarOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
              >
                Dashboard
              </span>
            </Link>
          </li>

          {/* Categories */}
          <li>
            <Link
              href="/dashboard/categories"
              className="flex items-center text-2xl gap-3 px-2 py-2 rounded hover:bg-[#d39f12]/20"
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v14M9 5v14M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
              </svg>

              <span
                className={`transition-all duration-300 ${
                  sidebarOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
              >
                Categories
              </span>
            </Link>
          </li>

          {/* Products */}
          <li>
            <Link
              href="/dashboard/products"
              className="flex items-center text-2xl gap-3 px-2 py-2 rounded hover:bg-[#d39f12]/20"
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 10V6a3 3 0 0 1 3-3a3 3 0 0 1 3 3v4m3-2l.917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z" />
              </svg>

              <span
                className={`transition-all duration-300 ${
                  sidebarOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
              >
                Products
              </span>
            </Link>
          </li>

          {/* Sign Out */}
          <li>
            <Link
              href="/login"
              className="flex text-2xl items-center gap-3 px-2 py-2 rounded hover:bg-[#d39f12]/20"
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H4m12 0l-4 4m4-4l-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
              </svg>

              <span
                className={`transition-all duration-300 ${
                  sidebarOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
              >
                Sign Out
              </span>
            </Link>
          </li>

        </ul>
      </div>
    </aside>
  )
}

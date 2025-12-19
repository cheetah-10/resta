'use client'

import React, { useState } from 'react'
import axios, { isAxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'


export default function CreateCategoriesModal({ onClose, 
    setCategoriesList
 }) {
    const [name, setName] = useState('')

    const [loading, setLoading] = useState(false)

    const inputStyle = `
    w-full px-4 py-3 rounded-xl
    bg-black text-white
    border border-[#FFBB15]/30
    placeholder:text-neutral-500
    focus:outline-none
    focus:border-[#FFBB15]
    focus:ring-2 focus:ring-[#FFBB15]/40
    transition
  `


    const handleSubmit = async (e) => {
    const {token} = useAuth()
        e.preventDefault()

        try {
            setLoading(true)
            const res = await axios.post(
                'http://localhost:5000/category',
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            console.log('Category created:', res.data)
            setCategoriesList?.(prev => [...prev, res.data.data])
            onClose()

            toast.success('Category added successfully!')
        } catch (err) {

            console.error(err.response?.data || err)
            toast.error( (err.response?.data?.message || err.message))

        } finally {
            setLoading(false)
        }
    }

    return (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      
      <div className="w-[90%] sm:w-105 bg-black rounded-2xl shadow-2xl border border-[#FFBB15]/30 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FFBB15]">
          <h2 className="text-lg font-semibold text-black">
            Add New Category
          </h2>

          <button
            onClick={onClose}
            className="text-black text-xl w-9 h-9 flex items-center justify-center
            rounded-full hover:bg-black/10 transition"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Name */}
          <div>
            <label className="block mb-2 text-sm text-neutral-400">
              Category Name
            </label>
            <input
              type="text"
              placeholder="e.g. Burgers"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className={inputStyle}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#FFBB15]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm
              border border-neutral-600 text-neutral-300
              hover:bg-neutral-800 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl text-sm font-medium
              bg-[#FFBB15] text-black
              hover:bg-[#e6a900]
              disabled:opacity-60 transition"
            >
              {loading ? 'Creating...' : 'Add Category'}
            </button>
          </div>

        </form>
      </div>
    </div>
    )
}
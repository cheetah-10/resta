'use client'

import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'

export default function UpdateCategorieModal({
  onClose,
  id,
  categoriesList,
  setCategoriesList
}) {
  const category = categoriesList?.find(c => c.id === id)

  const [name, setName] = useState(category?.name || '')
  const [loading, setLoading] = useState(false)

  if (!category) return null
    const {token} = useAuth()

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
    e.preventDefault()

    try {
      setLoading(true)
      const res = await axios.patch(
        `http://localhost:5000/category/${id}`,
        { name },
        {
          headers: {
              Authorization: `Bearer ${token}`,
          },
        }
      )

      setCategoriesList?.(prev =>
        prev.map(cat => (cat.id === id ? res.data.data : cat))
      )

      toast.success('Category updated successfully')
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-[90%] sm:w-[420px] bg-black rounded-2xl shadow-2xl border border-[#FFBB15]/30 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FFBB15]">
          <h2 className="text-lg font-semibold text-black">
            Edit Category
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
              {loading ? 'Updating...' : 'Edit Category'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

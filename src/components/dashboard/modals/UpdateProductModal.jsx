'use client'

import React, { useState } from 'react'
import axios, { isAxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'

export default function UpdateProductModal({ id, onClose, setProductsList, productsList }) {
    const product = productsList?.find(pr => pr.id === id)
    if (!product) return null

    const [name, setName] = useState(product.name)
    const [slug, setSlug] = useState(product.slug)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [discount, setDiscount] = useState(product.discount)
    const [stock, setStock] = useState(product.stock)
    const [categoryId, setCategoryId] = useState(product.categoryId)
    const [restaurantId, setRestaurantId] = useState(product.restaurantId)
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const customInputStyles = `w-full px-4 py-3 rounded-xl
    bg-black text-white
    border border-[#FFBB15]/30
    placeholder:text-neutral-500
    focus:outline-none
    focus:border-[#FFBB15]
    focus:ring-2 focus:ring-[#FFBB15]/40
    transition`
    const handleSubmit = async (e) => {
        e.preventDefault()
    const {token} = useAuth()

        const formData = new FormData()
        formData.append('name', name)
        formData.append('slug', slug)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('discount', discount)
        formData.append('stock', stock)
        formData.append('categoryId', categoryId)
        formData.append('restaurantId', restaurantId)
        if (file) formData.append('image', file)

        try {
            setLoading(true)
            const res = await axios.patch(
                `http://localhost:5000/product/${id}`,
                formData,  {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setProductsList(prev =>
                prev.map(p => p.id === id ? res.data.data : p)
            )

            toast.success('Product updated successfully!')
            onClose()
        } catch (err) {
            if (isAxiosError(err)) {
                toast.error(err.response?.data?.message || err.message)
            } else {
                toast.error('Something went wrong!')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-[90%] sm:w-105 bg-black rounded-2xl shadow-2xl border border-[#FFBB15]/30 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-[#FFBB15]">
                    <h2 className="text-lg font-semibold text-black">
                        Add New Product
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-black text-xl w-9 h-9 flex items-center justify-center
            rounded-full hover:bg-black/10 transition"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit}
                    className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto">
                    <input value={name} onChange={e => setName(e.target.value)} className={customInputStyles} />
                    <input value={slug} onChange={e => setSlug(e.target.value)} className={customInputStyles} />
                    <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="sm:col-span-2 px-4 py-3 rounded-xl border border-[#FFBB15]/30 focus:border-[#FFBB15] placeholder:text-neutral-500 text-white" />
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} className={customInputStyles} />
                    <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} className={customInputStyles} />
                    <input type="number" value={stock} onChange={e => setStock(e.target.value)} className={customInputStyles} />
                    <input value={categoryId} onChange={e => setCategoryId(e.target.value)} className={customInputStyles}/>
                    <input value={restaurantId} onChange={e => setRestaurantId(e.target.value)} className={customInputStyles} />
                    <input type="file" onChange={e => setFile(e.target.files[0])} className={customInputStyles}/>

                    <div className="sm:col-span-2 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className='px-4 py-2 rounded-xl text-sm
              border border-neutral-600 text-neutral-300
              hover:bg-neutral-800 transition'>Cancel</button>
                        <button disabled={loading} className="px-5 py-2 rounded-xl text-sm font-medium
              bg-[#FFBB15] text-black
              hover:bg-[#e6a900]
              disabled:opacity-60 transition">
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

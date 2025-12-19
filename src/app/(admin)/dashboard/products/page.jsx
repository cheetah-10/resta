'use client'
import CreateProductModal from '@/components/dashboard/modals/CreateProductModal';
import UpdateProductModal from '@/components/dashboard/modals/UpdateProductModal';
// import LoadingSpinner from '@/components/common/LoadingSpinner';
// import { useApiQuery } from '@/hooks/useFetch';
// import { getAuthToken } from '@/lib/getAuthToken';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

export default function Page() {
    const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);
    const {token} = useAuth()

    const openCreateProductModal = () => setIsCreateProductModalOpen(true);
    const closeCreateProductModal = () => setIsCreateProductModalOpen(false);

    const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);

    const openUpdateProductModal = (id) => {
        setEditingProductId(id);
        setIsUpdateProductModalOpen(true);
    }

    const closeUpdateProductModal = () => {
        setEditingProductId(null);
        setIsUpdateProductModalOpen(false);
    }

    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await axios.get("http://localhost:5000/product");
                setProductsList(res.data.data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load products");
            }
        }
        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/product/${productId}`,
                 {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            setProductsList(prev => prev.filter(p => p.id !== productId));
            toast.success('Product deleted successfully');
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product');
        }
    }

    return (
        <>
        <div className="relative overflow-x-auto rounded-2xl bg-black shadow-lg p-6 border border-[#FFBB15]/30">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h2 className="text-xl font-semibold text-[#FFBB15]">Products</h2>

                <button
                    onClick={openCreateProductModal}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                    bg-[#FFBB15] text-black font-medium hover:bg-[#e6a900] transition shadow-md"
                >
                    Add Product
                    <span className="text-xl font-bold">+</span>
                </button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-[#FFBB15]/20">
                <table className="w-full text-sm text-left bg-black">
                    {/* Table Head */}
                    <thead className="bg-[#FFBB15] text-black uppercase text-xs tracking-wide">
                        <tr>
                            <th className="px-6 py-4 font-semibold">ID</th>
                            <th className="px-6 py-4 font-semibold">Name</th>
                            <th className="px-6 py-4 font-semibold">Image</th>
                            <th className="px-6 py-4 font-semibold">Stock</th>
                            <th className="px-6 py-4 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {productsList?.map((product, index) => (
                            <tr
                                key={product.id}
                                className={`border-b border-[#FFBB15]/10
                                hover:bg-[#FFBB15]/10 transition
                                ${index % 2 === 0 ? "bg-black" : "bg-neutral-900"}`}
                            >
                                <td className="px-6 py-4 text-[#FFBB15] font-medium">{product.id}</td>
                                <td className="px-6 py-4 text-white">{product.name}</td>
                                <td className="px-6 py-4">
                                    <Image
                                        width={60}
                                        height={40}
                                        src={product.image?.secure_url || '/placeholder.png'}
                                        alt={product.name}
                                        className="rounded"
                                    />
                                </td>
                                <td className="px-6 py-4 text-white">{product.stock}</td>
                                <td className="px-6 py-4 flex justify-center gap-2">
                                    <button
                                        onClick={() => openUpdateProductModal(product.id)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FFBB15] text-black hover:bg-[#e6a900] transition"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {isCreateProductModalOpen && <CreateProductModal onClose={closeCreateProductModal} setProductsList={setProductsList} />}
        {isUpdateProductModalOpen && editingProductId && <UpdateProductModal onClose={closeUpdateProductModal} id={editingProductId} productsList={productsList} setProductsList={setProductsList} />}
        </>
    );
}

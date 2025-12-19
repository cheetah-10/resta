'use client'
import CreaterestaurantModal from '@/components/dashboard/modals/CreaterestaurantModal';
import UpdaterestaurantModal from '@/components/dashboard/modals/UpdaterestaurantModal';
// import LoadingSpinner from '@/components/common/LoadingSpinner';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

export default function Page() {
    const [isCreaterestaurantModalOpen, setIsCreaterestaurantModalOpen] = useState(false);
    const {token} = useAuth()

    const openCreaterestaurantModal = () => setIsCreaterestaurantModalOpen(true);
    const closeCreaterestaurantModal = () => setIsCreaterestaurantModalOpen(false);

    const [isUpdaterestaurantModalOpen, setIsUpdaterestaurantModalOpen] = useState(false);
    const [editingrestaurantId, setEditingrestaurantId] = useState(null);

    const openUpdaterestaurantModal = (id) => {
        setEditingrestaurantId(id);
        setIsUpdaterestaurantModalOpen(true);
    }

    const closeUpdaterestaurantModal = () => {
        setEditingrestaurantId(null);
        setIsUpdaterestaurantModalOpen(false);
    }

    const [restaurantsList, setrestaurantsList] = useState([]);

    useEffect(() => {
        async function restaurants() {
            try {
                const res = await axios.get("http://localhost:5000/restaurant");
                setrestaurantsList(res.data.data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load restaurants");
            }
        }
        restaurants();
    }, []);

    const handleDeleterestaurant = async (restaurantId) => {
        try {
            await axios.delete(`http://localhost:5000/restaurant/${restaurantId}`,
                 {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            setrestaurantsList(prev => prev.filter(p => p.id !== restaurantId));
            toast.success('restaurant deleted successfully');
        } catch (error) {
            console.error('Error deleting restaurant:', error);
            toast.error('Failed to delete restaurant');
        }
    }

    return (
        <>
        <div className="relative overflow-x-auto rounded-2xl bg-black shadow-lg p-6 border border-[#FFBB15]/30">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h2 className="text-xl font-semibold text-[#FFBB15]">restaurants</h2>

                <button
                    onClick={openCreaterestaurantModal}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                    bg-[#FFBB15] text-black font-medium hover:bg-[#e6a900] transition shadow-md"
                >
                    Add restaurant
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
                            <th className="px-6 py-4 font-semibold">Address</th>
                            <th className="px-6 py-4 font-semibold">Rating</th>
                            <th className="px-6 py-4 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {restaurantsList?.map((restaurant, index) => (
                            <tr
                                key={restaurant.id}
                                className={`border-b border-[#FFBB15]/10
                                hover:bg-[#FFBB15]/10 transition
                                ${index % 2 === 0 ? "bg-black" : "bg-neutral-900"}`}
                            >
                                <td className="px-6 py-4 text-[#FFBB15] font-medium">{restaurant.id}</td>
                                <td className="px-6 py-4 text-white">{restaurant.name}</td>
                                <td className="px-6 py-4">
                                    <Image
                                        width={60}
                                        height={40}
                                        src={restaurant.image?.secure_url || '/images/logo.png'}
                                        alt={restaurant.name}
                                        className="rounded"
                                    />
                                </td>
                                <td className="px-6 py-4 text-white">{restaurant.address}</td>
                                <td className="px-6 py-4 text-white">{restaurant.rating}</td>
                                <td className="px-6 py-4 flex justify-center gap-2">
                                    <button
                                        onClick={() => openUpdaterestaurantModal(restaurant.id)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#FFBB15] text-black hover:bg-[#e6a900] transition"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDeleterestaurant(restaurant.id)}
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

        {isCreaterestaurantModalOpen && <CreaterestaurantModal onClose={closeCreaterestaurantModal} setrestaurantsList={setrestaurantsList} />}
        {isUpdaterestaurantModalOpen && editingrestaurantId && <UpdaterestaurantModal onClose={closeUpdaterestaurantModal} id={editingrestaurantId} restaurantsList={restaurantsList} setrestaurantsList={setrestaurantsList} />}
        </>
    );
}

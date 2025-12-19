'use client'
import CreateCategoriesModal from '@/components/dashboard/modals/CreateCategoriesModal';
import UpdateCategorieModal from '@/components/dashboard/modals/UpdateCategorieModal';
import { useAuth } from '@/context/AuthContext';
import { useApiQuery } from '@/hooks/useFetch';
import axios from 'axios';
// import { withRole } from '@/components/protected/withRole';

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';


export default function Page() {
    const [isCreatecategorieModalOpen, setIsCreatecategorieModalOpen] = useState(false);

    const token = useAuth()

    function openCreateCategorieModal() {
        setIsCreatecategorieModalOpen(true);
    }
    function closeCreatecategorieModal() {
        setIsCreatecategorieModalOpen(false);
    }

    const [isUpdatecategorieModalOpen, setIsUpdatecategorieModalOpen] = useState(false);
    const [editingcategoryId, setEditingcategoryId] = useState(null);

    const openUpdateCategorieModal = (id) => {
        setEditingcategoryId(id);
        setIsUpdatecategorieModalOpen(true);
    }

    const closeUpdateCategorieModal = () => {
        setEditingcategoryId(null);
        setIsUpdatecategorieModalOpen(false);
    }



    const { data: categories, isLoading, isError } = useApiQuery(
        {
        queryKey: ["categories"],
        url: "http://localhost:5000/category",
   
      })


    // to save the state of categories
    const [categoriesList, setCategoriesList] = useState([]);
    useEffect(() => {
        categories && setCategoriesList(categories);
    }, [categories]);


    // delete category
    const handleDeleteCategory = async (categoryId) => {
        try {
            await axios.delete(`http://localhost:5000/category/${categoryId}`, 
                {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            setCategoriesList(prev => prev.filter(categorie => categorie.id !== categoryId));

            toast.success('categorie deleted successfully');
        } catch (error) {
            console.error('Error deleting categorie:', error);
            toast.error('Failed to delete categorie');
        }
    }


    // if (isLoading) return <LoadingSpinner />;
    // if (isError) return <div>Error loading categories.</div>;


    return (<>
        <div className="relative overflow-x-auto rounded-2xl bg-black shadow-lg p-6 border border-[#FFBB15]/30">
    
    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <h2 className="text-xl font-semibold text-[#FFBB15]">
        Categories
      </h2>

      <button
        onClick={openCreateCategorieModal}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl
        bg-[#FFBB15] text-black font-medium
        hover:bg-[#e6a900] transition shadow-md"
      >
        Add Category
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
            <th className="px-6 py-4 font-semibold">Slug</th>
            <th className="px-6 py-4 font-semibold text-center">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {categoriesList?.map((categorie, index) => (
            <tr
              key={categorie.id}
              className={`border-b border-[#FFBB15]/10
              hover:bg-[#FFBB15]/10 transition
              ${index % 2 === 0 ? "bg-black" : "bg-neutral-900"}`}
            >
              <td className="px-6 py-4 text-[#FFBB15] font-medium">
                {categorie.id}
              </td>

              <td className="px-6 py-4 text-white">
                {categorie.name}
              </td>

              <td className="px-6 py-4 text-neutral-400">
                {categorie.slug}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => openUpdateCategorieModal(categorie.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium
                    bg-[#FFBB15] text-black
                    hover:bg-[#e6a900] transition"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDeleteCategory(categorie.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium
                    bg-red-600 text-white
                    hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  </div>
        {isCreatecategorieModalOpen && <CreateCategoriesModal onClose={closeCreatecategorieModal} 
        setCategoriesList={setCategoriesList}
        />}
        {isUpdatecategorieModalOpen && editingcategoryId && (
            <UpdateCategorieModal onClose={closeUpdateCategorieModal} id={editingcategoryId} categoriesList={categoriesList} 
            setCategoriesList={setCategoriesList} 
            />
        )}

    </>
    )
}

// export default withRole(Page, ['admin'])
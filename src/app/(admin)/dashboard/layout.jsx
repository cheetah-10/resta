import Sidebar from "@/components/dashboard/sidebar";

export default function DashboardLayout({children}){

    return (



        <div className=''>
            <Sidebar/>

            <div className="p-4 pt-0 sm:ml-64 top-25 relative">
                {children}
            </div>
        </div>



    )
}
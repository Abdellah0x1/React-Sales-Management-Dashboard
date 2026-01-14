import { Outlet } from "react-router"
import Sidebar from "./components/Sidebar"
import { ProductsProvider } from "./contexts/ProductsContext"
import { useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx";



function Applayout() {
    const [sideBar, setSideBar] = useState(false);

    return (
        <ProductsProvider>
            <div className="p-4 md:p-0 m-0 text-gray-600 bg-gray-100  md:grid md:grid-cols-[20%_1fr] gap-x-4 max-w-screen ">
            <RxHamburgerMenu className="text-2xl md:hidden " onClick={()=> setSideBar(true)}/>
                <Sidebar setSideBar={setSideBar} className={`bg-white md:bg-inherit w-2/3 md:w-full absolute md:relative left-0 inset-y-0 z-50 transition-all delay-500  md:translate-none ${sideBar ? "-translate-x-none" : "-translate-x-full"}`}/>
                <main>
                    <Outlet/>
                </main>
            </div>
        </ProductsProvider>
    )
}

export default Applayout

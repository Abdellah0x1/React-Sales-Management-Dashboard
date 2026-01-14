import { NavLink } from "react-router"
import { MdDashboard, MdOutlineInventory, MdPointOfSale } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";



function Sidebar({className, setSideBar}) {
    function handleAcitve({isActive}){
        return isActive? "p-2 rounded-xl flex content-center items-center gap-2 bg-blue-100  text-blue-600 transition-all delay-75 hover:bg-blue-100    " 
        : "p-2 rounded-xl flex content-center items-center gap-2 transition-all delay-75 hover:bg-blue-100";
    }
    return (
        <div className={`min-h-screen p-4 shadow-2xl ${className}`}>
            <div>
            <button onClick={()=>setSideBar(false)} className="md:hidden absolute right-3 top-2 text-2xl hover:bg-red-200 hover:text-red-700">&times;</button>              
            <h3 className="mb-3">MAIN MENU</h3>
            <ul className="flex flex-col gap-4 ">
                <li><NavLink className={handleAcitve} to="/"><MdDashboard/> Dashboard</NavLink></li>
                <li><NavLink className={handleAcitve} to="/inventory"><MdOutlineInventory/> Inventory</NavLink></li>
                <li><NavLink className={handleAcitve} to="/pos"><MdPointOfSale/> POS</NavLink></li>
                <li><NavLink className={handleAcitve} to="/settings"><IoMdSettings/> Settings</NavLink></li>
            </ul>
            </div>
        </div>
    )
}

export default Sidebar

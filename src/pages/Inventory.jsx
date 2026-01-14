import {useState} from "react"
import { useSearchParams } from "react-router";
import { useProducts } from "../contexts/ProductsContext";
import { IoIosSearch } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";


import ProductCard from "../components/ProductCard";
import CreateProductModal from "../components/CreateProductModal"
import DeleteModal from "../components/DeleteModal";
import UpdateModal from "../components/UpdateModal";

import { ClipLoader } from "react-spinners"; 

function Inventory() {
    const {products,isLoading} = useProducts();
    const [searchParams, setSearchParams] = useSearchParams();
    const [showModal, setShowModal] = useState(false);
    const [productToDelete,setProductToDelete] = useState(null);
    const [productToUpdate, setProductToUpdate] = useState(null);

    const filter = searchParams.get("category") || "all";
    const filteredProducts = filter === "all" ? products : products.filter(product => product.category.toLowerCase() === filter); 
    return (
        <>
        {productToUpdate && <UpdateModal onClose={()=>setProductToUpdate(null)} toUpdate={productToUpdate}/>}
        {productToDelete && <DeleteModal setProductToDelete={setProductToDelete} product={productToDelete}/>}
        {showModal && <CreateProductModal onClose={()=> setShowModal(false)}/>}
        <div className={`bg-white p-4 m-4 shadow-2xl rounded-2xl border border-gray-200 min-h-screen ${isLoading ? "flex items-center justify-center" : ""}`}>
            {isLoading ?
             <ClipLoader/> :
             (
                <>
                <div className="flex flex-col justify-between md:flex-row gap-5 items-center"> 
                <div className="relative">
                    <input className="w-full font-semibold border border-gray-300 rounded-md p-2 pr-5 text-[0.8rem]" type="text" placeholder="Search"/>
                    <IoIosSearch className="absolute top-[50%] right-2 translate-y-[-50%]"/>
                </div>
                <div className="flex gap-3 items-center">
                    <button onClick={()=> setSearchParams({category: "electronics"})}>Electronics</button>
                    <button onClick={()=> setSearchParams({category: "clothing"})}>Clothing</button>
                    <button onClick={()=> setSearchParams({category: "books"})}>Books</button>
                </div>
                <button className="p-2 flex items-center gap-1 text-white bg-blue-500 hover:bg-blue-600 transition-all delay-150 rounded-md cursor-pointer" onClick={()=> setShowModal(true)}>
                    <IoAddOutline />
                    Add Product
                </button>
            </div>
            <div >
                <div className="w-full flex flex-col">
                    {filteredProducts.map((product) => <ProductCard setProductToUpdate={setProductToUpdate}  setProductToDelete={setProductToDelete} product={product} key={product.asin}/>)}
                </div>
            </div>
                </>
             )
            }
        </div>
        </>
    )
}

export default Inventory

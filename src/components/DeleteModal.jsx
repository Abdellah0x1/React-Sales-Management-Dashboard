import { createPortal } from "react-dom"
import { useProducts } from "../contexts/ProductsContext"

import toast from "react-hot-toast";

function DeleteModal({product ,setProductToDelete}) {
    const {deleteProducts} = useProducts();

    function handleCancel(){
        setProductToDelete(null)
    }

    function handelConfirm(){
        deleteProducts(product.asin);
        setProductToDelete(null);
        toast.success("product deleted")
    }

    return (
        createPortal(
            <div className="fixed inset-0 z-100 flex justify-center items-center bg-black/30 backdrop-blur-sm">
            <div className="shadow-2xl  bg-white  py-6 w-[60vw] md:w-[25vw] rounded-md text-black text-center">
                <p className="mb-4 text-2xl">Are you sure ?</p>
                <div className="flex gap-4 justify-center">
                    <button onClick={handleCancel}  className="bg-gray-200 px-2 py-1 rounded-md transition-all delay-150 hover:bg-gray-300 cursor-pointer">Cancel</button>
                    <button onClick={handelConfirm} className='bg-red-300 px-2 py-1 rounded-md transition-all delay-150 hover:bg-red-400 cursor-pointer'>Confirm</button>
                </div>
            </div>
            </div>,
        document.body
    )
    )
}

export default DeleteModal

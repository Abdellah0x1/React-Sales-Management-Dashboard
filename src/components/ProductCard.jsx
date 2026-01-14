import { MdDeleteForever, MdModeEdit } from "react-icons/md";


function ProductCard({product, setProductToDelete, setProductToUpdate}) {
    return (
        <div className="w-full flex items-center content-between gap-2 flex-wrap transfrom-all delay-150  hover:scale-[1.01] p-4  border-b border-gray-300 mx-auto">
            <img className="rounded-md  mx-auto w-10    object-cover " src={product.thumbnailImage} alt={product.category}/>
            <p className="w-[30%]">{product.title < 100 ? product.title : product.title.slice(0,100) + "..."}</p>
            <span className="font-bold text-xl ">{product.price?.value} $</span>
            <span className="block bg-gray-100 w-fit p-1 rounded-md border border-gray-400 my-4"> stock left : <strong>{product.stock}</strong></span>
            <div className="flex gap-2">
                <button onClick={()=> setProductToDelete(product)} className="text-xl text-red-500 hover:bg-red-200 transition-all delay-150 p-2 rounded-md"><MdDeleteForever/></button>
                <button onClick={()=> setProductToUpdate(product)}  className="text-xl text-blue-800 hover:bg-blue-200 transition-all delay-150 p-2 rounded-md"><MdModeEdit/></button>

            </div>
        </div>
    )
}

export default ProductCard

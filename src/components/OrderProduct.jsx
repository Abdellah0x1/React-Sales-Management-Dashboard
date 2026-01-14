import { useState } from "react";
import { CiTrash } from "react-icons/ci";


function OrderProduct({product,removeProduct,updateQuantity}) {
    const count = product.quantity || 1;

    return (
        <div className="flex items-center gap-2 rounded-md text-gray-600 hover:bg-gray-50 p-2" key={product.asin}>
            <img className="rounded-ms w-10 object-cover" src={product.thumbnailImage} />
                <div className="flex flex-col gap-2">
                    <p>{product.title.length < 20? product.title : product.title.slice(0,20)+ "..." }</p>
                    <div className="text-black font-semibold flex gap-2">
                        <button onClick={()=>updateQuantity(product.asin, count-1)}  className="border border-black rounded-sm px-2 cursor-pointer">-</button>
                        <span>{count}</span>
                        <button onClick={()=>updateQuantity(product.asin, count+1)} className=" border border-black rounded-sm px-2 cursor-pointer">+</button>
                    </div>
                    <span className="text-black font-semibold">${product.price?.value}</span>
                </div>
            <button onClick={() => removeProduct(product.asin)} className="text-red-500 text-2xl cursor-pointer hover:text-red-600 hover:bg-red-200 rounded-sm p-1"><CiTrash/></button>
        </div>
    )
}

export default OrderProduct

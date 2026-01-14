import { useState } from "react"
import { createPortal } from "react-dom";
import { useProducts } from "../contexts/ProductsContext";


function UpdateModal({toUpdate, onClose}) {
    const [title, setTitle] = useState(toUpdate.title);
    const [price, setPrice] = useState(toUpdate.price.value);
    const [imgUrl, setImgUrl] = useState(toUpdate.thumbnailImage);

    const {updateProduct} = useProducts();

    function handleSubmit(e){
        e.preventDefault();
        updateProduct(toUpdate.asin,{
            ...toUpdate,
            title,
            price: {
                "value": price,
                "currency": "$"
            },
            thumbnailImage:imgUrl
        });
        onClose();
    }
    
    return (
        createPortal(
                    <div className='inset-0 bg-black/20 fixed z-1000 flex justify-center items-center backdrop-blur-sm'>
                        <div className=' shadow-2xl flex flex-col items-center gap-4 p-4 rounded-xl w-[80vw] md:w-[30vw] bg-white text-black'>
                    <h2 className='text-center text-2xl font-bold uppercase'>Update product</h2>
                    <form className='flex flex-col items-center gap-4 w-full'>
                    <div className='w-full flex flex-col  gap-3 '>
                        <label htmlFor="title">Title:</label>
                        <input className=' w-full p-1 bg-gray-50 rounded-md border border-gray-200 focus:border-gray-300'  value={title} onChange={(e)=> setTitle((e.target.value))} type='text' id='title'/>
                    </div>
                    <div className='w-full flex flex-col  gap-3 '>
                        <label htmlFor="price">Price:</label>
                        <input className='w-full p-1 bg-gray-50 rounded-md border border-gray-200 ' value={price} onChange={(e)=> setPrice(Number(e.target.value))} type='number' id='price' min={0}/>
                    </div>

                    <div className='w-full flex flex-col  gap-3 '>
                        <label htmlFor="imgUrl">Image URL:</label>
                        <input className=' w-full p-1 bg-gray-50 rounded-md border border-gray-200 focus:border-gray-300'  value={imgUrl} onChange={(e)=> setImgUrl((e.target.value))} type="url" id='imgUrl'/>
                    </div>
                    <div className='flex gap-2'>
                        <button className='bg-gray-200 px-2 py-1 rounded-md transition-all delay-150 hover:bg-gray-300 cursor-pointer' type='button' onClick={onClose}>Cancel</button>
                        <button className='bg-green-300 px-2 py-1 rounded-md transition-all delay-150 hover:bg-green-400 cursor-pointer' type='submit' onClick={e => handleSubmit(e)}>Save  </button>
                    </div>
                </form>
                </div>
                </div>
                    ,document.body)
    )
}

export default UpdateModal

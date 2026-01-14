import {useEffect, useRef,useState} from 'react';
import {createPortal} from "react-dom"
import { useProducts } from '../contexts/ProductsContext';


function CreateProductModal({onClose}) {
    const {createProduct} = useProducts()

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('Clothing')
    const [imgUrl, setImgUrl] = useState('');
    const inputRef = useRef(null)

    useEffect(()=> {
        inputRef.current.focus();
    },[])

    function handleSubmit(e){
        e.preventDefault();
        if(!title || !price) return;

        const newProduct = {
                title: title,
                price: { value: Number(price), currency: "$" },
                breadCrumbs: category === "clothing" 
                ? "Clothing, Shoes & Jewelry > User Created" 
                : "Electronics > User Created",


                brand: "RetailDash Store",
                stars: 5,
                reviewsCount: 0,
                

                thumbnailImage: imgUrl || "https://via.placeholder.com/150", 
                
                description: "Added by Admin",
                stock: 10
            };

            createProduct(newProduct);
            onClose();

    }

    return (
        createPortal(
            <div className='inset-0 bg-black/20 fixed z-1000 flex justify-center items-center backdrop-blur-sm'>
                <div className=' shadow-2xl flex flex-col items-center gap-4 p-4 rounded-xl w-[80vw] md:w-[30vw] bg-white text-black'>
            <h2 className='text-center text-2xl font-bold uppercase'>Add a new product</h2>
                <form className='flex flex-col items-center gap-4 w-full'>
            <div className='w-full flex flex-col  gap-3 '>
                <label htmlFor="title">Title:</label>
                <input className=' w-full p-1 bg-gray-50 rounded-md border border-gray-200 focus:border-gray-300' ref={inputRef} value={title} onChange={(e)=> setTitle((e.target.value))} type='text' id='title'/>
            </div>
            <div className='w-full flex flex-col  gap-3 '>
                <label htmlFor="price">Price:</label>
                <input className='w-full p-1 bg-gray-50 rounded-md border border-gray-200 ' value={price} onChange={(e)=> setPrice(Number(e.target.value))} type='number' id='price' min={0}/>
            </div>
            <div className='w-full flex flex-col  gap-3 '>
                <label htmlFor="title">Category:</label>
                <select value={category} onChange={(e)=> setCategory(e.target.value)} className='w-full p-1 bg-gray-50 rounded-md border border-gray-200' id='title'>
                    <option value={'Electronics'}>Electronics</option>
                    <option value={'Clothing'}>Clothing</option>
                    <option value={'Books'}>Books</option>
                </select>
            </div>
            <div className='w-full flex flex-col  gap-3 '>
                <label htmlFor="imgUrl">Image URL:</label>
                <input className=' w-full p-1 bg-gray-50 rounded-md border border-gray-200 focus:border-gray-300'  value={imgUrl} onChange={(e)=> setImgUrl((e.target.value))} type="url" id='imgUrl'/>
            </div>
            <div className='flex gap-2'>
                <button className='bg-gray-200 px-2 py-1 rounded-md transition-all delay-150 hover:bg-gray-300 cursor-pointer' type='button' onClick={onClose}>Cancel</button>
                <button className='bg-green-300 px-2 py-1 rounded-md transition-all delay-150 hover:bg-green-400 cursor-pointer' type='submit' onClick={e => handleSubmit(e)}>Add Product</button>
            </div>
        </form>
        </div>
        </div>
            ,document.body)
    )
}

export default CreateProductModal

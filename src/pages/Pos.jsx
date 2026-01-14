import { useEffect, useRef, useState } from "react"
import { useProducts } from "../contexts/ProductsContext";
import PosCard from "../components/PosCard";
import OrderCard from "../components/OrderCard";

import { ClipLoader } from "react-spinners";

function Pos() {
    const [query, setQuery] = useState("");
    const [orderProducts, setOrderProducts] = useState([]);
    const inputRef = useRef(null);
    const {products,isLoading} = useProducts();


    

    function addToCard(product){
        for(let i = 0 ; i < orderProducts.length; i++){
            if(orderProducts[i].asin === product.asin) return
        }
        setOrderProducts(products=> [...products,product]);

    }
    
    
    const displayedProducts = query ? products.filter(product => product.asin == query || product.title.toLowerCase().includes(query)) : products;

    useEffect(()=>{
        inputRef.current.focus();
    },[])


    return (
        <div className={`grid  md:grid-cols-[1fr_25%] `}>
            <div className={`md:m-4 bg-white shadow-2xl px-4 py-5 rounded-2xl border border-gray-200 ${isLoading ? "w-[100%] flex items-center justify-center" : ""}`}>
        {
            isLoading ?
            <ClipLoader/>:
            <>
                <input ref={inputRef} className="mb-4 w-full border border-gray-300 px-2 py-1 rounded-md"  value={query} onChange={(e)=> setQuery(e.target.value)} type="text" placeholder="Search for a product (id or title)"/>
                <div className="flex  flex-wrap gap-2">
                        {displayedProducts.map(product => <PosCard addToCard={addToCard} product={product} key={product.asin}/>)}
                </div>
            </>
        }
        </div>
        <OrderCard  setOrderProducts={setOrderProducts}  products={orderProducts}/> 
        </div>
    )
}

export default Pos

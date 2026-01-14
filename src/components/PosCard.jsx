function PosCard({product, addToCard}) {
    


    return (
        <div className=" bg-gray-50 rounded-md w-[40%] md:w-62.5 p-2 flex flex-col justify-center items-center gap-2">
            <img className=" h-10 md:h-25 object-cover" src={product.thumbnailImage}/>
            <p className="text-center text-[0.9rem]">{product.title.length < 60 ? product.title : product.title.slice(0,60)  + "..." }</p>
            <span className="text-gray-400">{product.stock} Available</span>
            <span className="font-bold text-xl md:text-2xl">{product.price?.value } $</span>
            <button onClick={()=>addToCard(product)}  className="p-1 md:p-2 cursor-pointer border border-blue-600 bg-white text-blue-600 rounded-md hover:text-white hover:bg-blue-600 transition-all delay-150">Add to card</button>
        </div>
    )
}

export default PosCard

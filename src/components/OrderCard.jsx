import { useProducts } from "../contexts/ProductsContext";
import OrderProduct from "./OrderProduct";

import toast from "react-hot-toast";


function OrderCard({products, setOrderProducts}) {

    const {handleOrder} = useProducts();

    const total = products.reduce((acc,curr)=> { 
        const price = curr.price?.value || curr.price || 0;
        const quantity = curr.quantity || 1;
        return acc + (price * quantity);
    },0) ;

    async function handleCheckout(){
            if(products.length === 0) return;
    
            const newOrder ={
                asin: crypto.randomUUID(),
                items: products,
                date: new Date().toDateString(),
                totalPrice: total
    
            }
    
            await handleOrder(newOrder);
    
            setOrderProducts([]);
    
            toast.success("Order Done")
        }


    function updateQuantity(asin, newQuantity){
        if(newQuantity < 1) return;

        setOrderProducts(products.map(product => product.asin == asin ? {...product, quantity: newQuantity}: product));
    }
    

    function removeProduct(asin){
        setOrderProducts([...products.filter(product => product.asin !== asin)])
    }

    return (
        <div className="bg-white text-black p-4 h-screen">
            <h2 className="text-center text-2xl mb-4">Order Details</h2>
            <div className="flex flex-col gap-2 pb-2 overflow-scroll max-h-[80%] border-b-2    border-b-gray-400">
                {products.map(product => (
                    <OrderProduct updateQuantity={updateQuantity} total={total} product={product} removeProduct={removeProduct} key={product.asin}/>
                ))}
            </div>
            <div>
                <p className="font-semibold flex justify-between">Total : <span className="text-green-500">${total.toFixed(2)}</span></p>
            </div>
            {products && <button onClick={handleCheckout} className="mt-2 text-white bg-blue-600 py-1 px-2 rounded-md border hover:border-blue-500 hover:text-blue-500 hover:bg-white transition-all delay-150 cursor-pointer">Make Order</button> }
        </div>
    )
}

export default OrderCard

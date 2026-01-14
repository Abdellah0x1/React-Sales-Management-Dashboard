import { createContext, useEffect, useState, useContext } from "react";


const ProductsContext = createContext();

export function ProductsProvider({children}){

    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(
        function(){
            async function getData(){
                try {
                    setIsLoading(true)
                    const prodRequest = await fetch("http://localhost:8000/products");
                    const prodData = await prodRequest.json();

                    const salesRequest = await fetch("http://localhost:8000/sales");
                    const salesData = await salesRequest.json();

                    setProducts(prodData);
                    setSales(salesData)
                    setIsLoading(false)
                }catch {
                    console.log("error fetching products")
                }finally {
                    setIsLoading(false);
                }
            }
            getData();
        }
        ,[])


        async function deleteProducts(id){
            try {
                await fetch(`http://localhost:8000/products/${id}`,{method: "DELETE"});
            setProducts(products => products.filter(product => product.asin !== id))
            }catch(error) {
                console.log("error deleting product", error);   
            }
        }

        async function createProduct({newProduct}){
            const uuid = crypto.randomUUID();
            try {
                const response = await fetch("http://localhost:8000/products",{
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({
                        newProduct,
                        asin: uuid,
                        breadCrumbs: "User Created",
                        stock: 10
                    })
                });

                const data = await response.json();
                setProducts(curr => [ data,...curr] )

            }catch(error){
                console.error('Error creating post', error);
            }
        }

        async function updateProduct(id, newProduct){
            try {
                const request = await fetch(`http://localhost:8000/products/${id}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newProduct)
                    }
                )
                const data = await request.json();
                const updatedProducts = [...products.filter(product => product.asin !== id),data ]
                setProducts(updatedProducts)
                
            }catch(error){
                console.error("error updating a product", error)
            }
        }


        async function handleOrder(order){
            try {
                console.log(order)
                await fetch("http://localhost:8000/sales",{
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(order)
                })
            

            await Promise.all(
                order.items.map(async (item) => {
                const currProduct = products.find(product=> product.asin == item.asin)
                await fetch(`http://localhost:8000/products/${item.asin}`,{
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        stock: (currProduct.stock || 0) - item.quantity
                    })
                })
            })
            );

            setProducts(products => products.map(product=> {
                const productSold = order.find(item => item.asin == products.asin);

                if(productSold) return {...product,stock:(product.stock || 0) - productSold.quantity}
                return product;
            }))
                

            }catch(error) {
                console.error("error processing order", error)
            }
        }

    return <ProductsContext.Provider value={{
        products,
        sales,
        isLoading,
        setProducts,
        deleteProducts,
        createProduct,
        updateProduct,
        handleOrder
    }}>
        {children}
    </ProductsContext.Provider>
}

export function useProducts(){
    const {products,sales,deleteProducts,updateProduct,handleOrder,isLoading} = useContext(ProductsContext);

    if(products === undefined) throw new Error("useProducts was used outside of the Products Provider")
    return {products,sales,deleteProducts,updateProduct,handleOrder,isLoading};
}

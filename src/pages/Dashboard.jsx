
import SalesChart from "../components/SalesChart"
import { useProducts } from "../contexts/ProductsContext"
function Dashboard() {
    const {sales} = useProducts()
    return (
        <div className="bg-white shadow-2xl md:m-4 px-4 py-5 rounded-2xl border border-gray-200">
            <h2 className="text-center text-2xl text-black">Sales Dashborad</h2>
            <SalesChart salesData={sales} />
        </div>
    )
}

export default Dashboard

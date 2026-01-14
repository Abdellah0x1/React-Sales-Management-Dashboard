import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

function SalesChart({salesData}) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);


    useEffect(()=>{
        if(chartRef.current) chartRef.current.destroy();

        const ctx = canvasRef.current.getContext("2d");

        const labels = salesData.map((sales,index) => `Order ${index}` );
        const dataPoints = salesData.map(sale => sale.totalPrice);

        chartRef.current = new Chart(ctx,{
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'sales history',
                        data: dataPoints,
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 2,
                        tension: 0.4,
                    }
                ]
            }}
        )

    },[salesData])


    return (
        <div>
            <h3>Sales History</h3>
            <div><canvas ref={canvasRef}/></div>
        </div>
    )
}

export default SalesChart
